// src/data/data.ts

import prisma from '~/prisma/client';
import { format, startOfWeek, endOfWeek, subWeeks, startOfDay, subDays, addDays } from 'date-fns'; // <-- CRITICAL: Imported addDays
import { ChartData } from 'chart.js';
import { 
    TaskClassification, 
    TroubleTicket, 
    SpecificRequestType 
} from '@prisma/client';

// =======================================================
// 1. Types & Structure
// =======================================================

export type TaskType = TaskClassification; 

interface TroubleTicketRecord extends TroubleTicket {
    handler: { name: string } | null;
}

export interface DynamicWeeklyComparisonData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string | string[]; 
        borderColor: string | string[]; 
        borderWidth: number;
        borderRadius: number;
    }[];
    currentWeekTotal: number;
    percentageChange: number;
}

export type DynamicWeeklyClassificationComparisonData = Record<TaskType, DynamicWeeklyComparisonData>;

// Defined color palette
const COLORS = {
    Provisioning: 'rgba(75, 192, 192, 0.8)',
    Maintenance: 'rgba(255, 159, 64, 0.8)',
    Others: 'rgba(153, 102, 255, 0.8)',
    TaskPending: 'rgba(255, 0, 0, 0.8)', // Red
    TaskInProgress: 'rgba(255, 185, 0, 0.8)', // NEW: Yellow/Orange for In-Progress
    TaskCompleted: 'rgba(0, 128, 0, 0.8)', // Green
    Historical: 'rgba(75, 192, 192, 1)',
};

// =======================================================
// 2. Database Query Function (FIXED)
// =======================================================

// FIX 1: Renamed endDate to endDateExclusive and changed 'lte' to 'lt'
async function fetchTasks(startDate: Date, endDateExclusive: Date, type?: TaskType): Promise<TroubleTicketRecord[]> {
    
    const queryResult = await prisma.troubleTicket.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lt: endDateExclusive, // <-- THE CRITICAL FIX: Use 'lt' (less than)
            },
            ...(type && { tasksClassification: type }), 
        },
        include: {
            handler: {
                select: { name: true }
            }
        }
    });
    
    return queryResult as TroubleTicketRecord[];
}


// =======================================================
// 3. Calculation Functions (UPDATED FOR TIMEZONE SAFETY)
// =======================================================

// --- A. Weekly Trend Comparison ---
export async function getWeeklyClassificationComparisonData(numWeeks: number): Promise<DynamicWeeklyClassificationComparisonData> {
    const taskTypes: TaskType[] = [TaskClassification.Provisioning, TaskClassification.Maintenance, TaskClassification.Others];
    const results: DynamicWeeklyClassificationComparisonData = {
        Provisioning: { labels: [], datasets: [], currentWeekTotal: 0, percentageChange: 0 },
        Maintenance: { labels: [], datasets: [], currentWeekTotal: 0, percentageChange: 0 },
        Others: { labels: [], datasets: [], currentWeekTotal: 0, percentageChange: 0 },
    };

    const anchorDate = new Date(); 
    const currentWeekStart = startOfWeek(anchorDate, { weekStartsOn: 1 });
    // The end of the current week must be exclusive (start of the next week)
    const chartDataEndExclusive = startOfWeek(addDays(anchorDate, 7), { weekStartsOn: 1 }); // Next week's start
    
    const chartDataStart = startOfWeek(subWeeks(currentWeekStart, numWeeks - 1), { weekStartsOn: 1 });

    const labels: string[] = [];
    for (let i = numWeeks - 1; i >= 0; i--) {
        labels.push(format(subWeeks(currentWeekStart, i), 'MMM dd')); 
    }
    
    // Fetch all tasks for the entire period using the new exclusive boundary
    const allTasks = await fetchTasks(chartDataStart, chartDataEndExclusive); 

    for (const type of taskTypes) {
        const typeTasks = allTasks.filter(t => t.tasksClassification === type);
        const dataPoints: number[] = [];
        let totalPriorWeeks = 0;

        for (let i = numWeeks - 1; i >= 0; i--) {
            const weekStart = startOfWeek(subWeeks(currentWeekStart, i), { weekStartsOn: 1 });
            // Define the end as the start of the next week (exclusive boundary)
            const weekEndExclusive = startOfWeek(addDays(subWeeks(currentWeekStart, i), 7), { weekStartsOn: 1 }); 

            const count = typeTasks.filter(t => 
                t.createdAt.getTime() >= weekStart.getTime() && 
                t.createdAt.getTime() < weekEndExclusive.getTime() // FIX: Use '<' for internal filter
            ).length;

            dataPoints.push(count);
            
            if (i > 0) {
                totalPriorWeeks += count;
            }
        }
        
        // ... rest of percentage calculation logic remains the same
        const currentWeekTotal = dataPoints[dataPoints.length - 1] || 0;
        const priorWeeksCount = numWeeks - 1;
        const priorAverage = priorWeeksCount > 0 ? totalPriorWeeks / priorWeeksCount : 0;
        
        let percentageChange: number;
        if (priorAverage === 0) {
            percentageChange = currentWeekTotal > 0 ? -999.9 : 0; 
        } else {
            percentageChange = ((currentWeekTotal - priorAverage) / priorAverage) * 100;
        }

        results[type] = {
            labels: labels,
            datasets: [{
                label: `${type} Tasks`,
                data: dataPoints,
                backgroundColor: dataPoints.map((data, index) => {
                    const isCurrentWeek = index === dataPoints.length - 1;
                    if (isCurrentWeek) return COLORS[type];
                    return COLORS[type].replace('0.8', '0.5');
                }),
                borderColor: COLORS[type].replace('0.8', '1'),
                borderWidth: 1,
                borderRadius: 4,
            }],
            currentWeekTotal: currentWeekTotal,
            percentageChange: parseFloat(percentageChange.toFixed(1)),
        };
    }

    return results;
}

// --- B. Handler Performance ---
// FIX 2: Updated signature and passed to fetchTasks
export async function getFilteredHandlerPerformanceData(startDate: Date, endDateExclusive: Date): Promise<ChartData<"bar"> & { options: any }> {
    const allTasks = await fetchTasks(startDate, endDateExclusive); // Uses fixed fetchTasks
    
    const handlerMap = allTasks.reduce((acc, task) => {
        const handlerName = task.handler?.name || 'Unassigned';
        // Determine the task status for charting
        const isCompleted = task.status === 'Resolved';
        const isInProgress = task.status === 'In_Progress'; // Assuming your Prisma enum has 'In-Progress'
        
        if (!acc[handlerName]) {
            // Initialize with the three states
            acc[handlerName] = { Completed: 0, InProgress: 0, Pending: 0 };
        }
        
        if (isCompleted) {
            acc[handlerName].Completed += 1;
        } else if (isInProgress) {
            acc[handlerName].InProgress += 1;
        } else {
            // Any status that is not Resolved or In-Progress (e.g., Pending, Failed)
            acc[handlerName].Pending += 1;
        }
        return acc;
    }, {} as Record<string, { Completed: number, InProgress: number, Pending: number }>);
    
    // Sort handlers by total tasks (Completed + InProgress + Pending)
    const sortedHandlers = Object.entries(handlerMap)
        .sort(([, a], [, b]) => (b.Completed + b.InProgress + b.Pending) - (a.Completed + a.InProgress + a.Pending))
        .map(([handler]) => handler);

    // Map the counts for each state
    const completedData = sortedHandlers.map(handler => handlerMap[handler].Completed);
    const inProgressData = sortedHandlers.map(handler => handlerMap[handler].InProgress);
    const pendingData = sortedHandlers.map(handler => handlerMap[handler].Pending);

    return {
        labels: sortedHandlers,
        datasets: [
            // Order datasets for charting (Completed at the bottom, Pending at the top)
            { label: 'Completed', data: completedData, backgroundColor: COLORS.TaskCompleted },
            { label: 'In-Progress', data: inProgressData, backgroundColor: COLORS.TaskInProgress },
            { label: 'Pending', data: pendingData, backgroundColor: COLORS.TaskPending },
        ],
        options: {}
    };
}

// --- C. Zonal Task Data ---
// FIX 2: Updated signature and passed to fetchTasks
export async function getFilteredZonalTaskData(startDate: Date, endDateExclusive: Date): Promise<ChartData<"bar">> {
    const allTasks = await fetchTasks(startDate, endDateExclusive); // Uses fixed fetchTasks
    
    const allZones = Array.from(new Set(allTasks.map(t => t.zone))).filter(Boolean).sort(); 
    const taskTypes: TaskType[] = [TaskClassification.Provisioning, TaskClassification.Maintenance, TaskClassification.Others];

    const zonalData = allTasks.reduce((acc, task) => {
        const zoneKey = task.zone;
        const typeKey = task.tasksClassification;
        
        if (!acc[zoneKey]) {
            acc[zoneKey] = { Provisioning: 0, Maintenance: 0, Others: 0 };
        }
        acc[zoneKey][typeKey] += 1;
        return acc;
    }, {} as Record<string, Record<TaskType, number>>);

    const datasets = taskTypes.map(type => {
        return {
            label: type,
            data: allZones.map(zone => zonalData[zone]?.[type] || 0),
            backgroundColor: COLORS[type],
            borderColor: COLORS[type],
            borderWidth: 1,
            borderRadius: 4,
        };
    });

    return {
        labels: allZones,
        datasets: datasets,
    };
}

// --- D. Task Classification Distribution (Doughnut) ---
// FIX 3: Updated signature and passed to fetchTasks
export async function getTaskDistributionData(startDate: Date, endDateExclusive: Date): Promise<ChartData<"doughnut">> {
    const allTasks = await fetchTasks(startDate, endDateExclusive); // Uses fixed fetchTasks
    const taskTypes: TaskType[] = [TaskClassification.Provisioning, TaskClassification.Maintenance, TaskClassification.Others];

    const counts = taskTypes.map(type => 
        allTasks.filter(t => t.tasksClassification === type).length
    );

    return {
        labels: taskTypes,
        datasets: [{
            data: counts,
            backgroundColor: taskTypes.map(type => COLORS[type]),
            hoverOffset: 8,
        }]
    };
}

// --- E. Historical Daily Task Volume (Line) ---
export async function getTaskHistoryData(anchorDate: Date, days: number = 7): Promise<ChartData<"line">> {
    
    // Calculate the exclusive end boundary: Start of the day AFTER the anchorDate
    const anchorDayStart = startOfDay(anchorDate);
    const endDateExclusive = addDays(anchorDayStart, 1); 
    
    // Calculate the inclusive start boundary: Start of the day 7 days before the exclusive end
    const startDate = subDays(endDateExclusive, days);

    // Fetch tasks using the correct exclusive boundary
    const allTasks = await fetchTasks(startDate, endDateExclusive); // fetchTasks now uses 'lt'
    
    // Logic for creating labels and dates for the chart
    const dates: Date[] = [];
    const labels: string[] = [];
    
    // Dates are calculated from the anchorDate backwards to ensure the last day is correct
    for (let i = days - 1; i >= 0; i--) {
        const date = subDays(anchorDayStart, i);
        dates.push(date);
        labels.push(format(date, 'MMM d'));
    }

    // FIX 4: Internal filtering logic must also use the exclusive boundary
    const dataPoints = dates.map(dayStart => {
        const dayEndExclusive = addDays(dayStart, 1); // Start of the next day
        return allTasks.filter(t => 
            t.createdAt.getTime() >= dayStart.getTime() && 
            t.createdAt.getTime() < dayEndExclusive.getTime() // FIX: Use '<' for internal filter
        ).length;
    });

    return {
        labels: labels,
        datasets: [{
            label: 'Total Tasks',
            data: dataPoints,
            borderColor: COLORS.Historical,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.3,
        }]
    };
}

// --- F. Specific Request Type Distribution (Bar) ---
// FIX 3: Updated signature and passed to fetchTasks
export async function getSpecificRequestTypeDistribution(startDate: Date, endDateExclusive: Date): Promise<ChartData<"bar">> {
    const allTasks = await fetchTasks(startDate, endDateExclusive); // Uses fixed fetchTasks
    
    // Get all unique request types
    const allRequestTypes: SpecificRequestType[] = Array.from(new Set(allTasks.map(t => t.specificRequestType))).filter(Boolean).sort() as SpecificRequestType[];
    
    const counts = allRequestTypes.map(type => 
        allTasks.filter(t => t.specificRequestType === type).length
    );

    const barColor = 'rgba(255, 165, 0, 0.8)'; // Orange for differentiation

    return {
        labels: allRequestTypes.map(label => {
            // Shorten long labels for better display on the chart
            if (label.length > 25) {
                // Simplified shortening logic
                return label.split(/[\s_-]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').substring(0, 25) + '...';
            }
            return label;
        }),
        datasets: [{
            label: 'Task Count',
            data: counts,
            backgroundColor: barColor,
            borderColor: barColor.replace('0.8', '1'),
            borderWidth: 1,
            borderRadius: 4,
        }]
    };
}