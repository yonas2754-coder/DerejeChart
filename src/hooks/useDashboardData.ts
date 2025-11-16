// src/hooks/useDashboardData.ts

import { ChartData } from "chart.js";
import { format } from "date-fns";
import { useQuery } from '@tanstack/react-query';

// --- Placeholder for external types ---
// Assuming these are defined elsewhere or correctly inferred:
type TaskClassification = 'Provisioning' | 'Maintenance' | 'Others'; 
// type SpecificRequestType = string; // Add if needed

// --- Types ---
export type TaskType = TaskClassification; 

export interface WeeklyTrendAPIResponse {
    weeklyTrend: Record<TaskType, {
        labels: string[]; 
        datasets: any[];
        currentWeekTotal: number; 
        percentageChange: number; 
    }>;
}

export interface DateDependentAPIResponse {
    handlerPerformance: ChartData<"bar"> & { options: any };
    zonalTasks: ChartData<"bar">;
    distribution: ChartData<"doughnut">;
    taskHistory: ChartData<"line">;
    specificRequests: ChartData<"bar">;
}

export type DashboardAPIResponse = WeeklyTrendAPIResponse & DateDependentAPIResponse;

// --- Fetch Functions (Query Functions) ---

const fetchWeeklyTrend = async (numWeeks: number): Promise<WeeklyTrendAPIResponse> => {
    const trendUrl = `/api/dashboard/weekly-trend?weeks=${numWeeks}`;
    const trendRes = await fetch(trendUrl);
    
    if (!trendRes.ok) {
        const errorDetails = await trendRes.json().catch(() => ({ message: 'No message provided.' }));
        throw new Error(`Weekly Trend API failed (${trendRes.status}): ${errorDetails.message}`);
    }
    
    return trendRes.json();
};

const fetchDateDependent = async (selectedDate: Date): Promise<DateDependentAPIResponse> => {
    const dateString = format(selectedDate, 'yyyy-MM-dd');
    const dependentUrl = `/api/dashboard/date-dependent?date=${dateString}`;

    const dependentRes = await fetch(dependentUrl);
    
    if (!dependentRes.ok) {
        const errorDetails = await dependentRes.json().catch(() => ({ message: 'No message provided.' }));
        throw new Error(`Date Dependent API failed (${dependentRes.status}): ${errorDetails.message}`);
    }
    
    return dependentRes.json();
};

// =======================================================
// 1. Hook for Weekly Trend Data (useQuery)
// =======================================================

export const useWeeklyTrendData = (
    numWeeks: number
) => {
    return useQuery<WeeklyTrendAPIResponse, Error>({
        queryKey: ['dashboard', 'weeklyTrend', numWeeks],
        queryFn: () => fetchWeeklyTrend(numWeeks),
        staleTime: 300000, 
    });
};

// =======================================================
// 2. Hook for Date Dependent Data (useQuery)
// =======================================================

export const useDateDependentData = (
    selectedDate: Date
) => {
    const dateString = format(selectedDate, 'yyyy-MM-dd');

    return useQuery<DateDependentAPIResponse, Error>({
        queryKey: ['dashboard', 'dateDependent', dateString],
        queryFn: () => fetchDateDependent(selectedDate),
        staleTime: 600000, // 10 minutes
    });
};

// =======================================================
// 3. Combined Hook for use in DashboardCharts.tsx
// =======================================================

export const useDashboardData = (
    selectedDate: Date, 
    numWeeks: number
): { 
    data: DashboardAPIResponse; 
    isTrendLoading: boolean; 
    isDateLoading: boolean;
    error: string | null 
} => {
    const trendQuery = useWeeklyTrendData(numWeeks);
    const dateQuery = useDateDependentData(selectedDate);
    
    // Default data structure to prevent component errors while loading
    const defaultWeeklyTrend = { 
        Provisioning: { labels: [], datasets: [], currentWeekTotal: 0, percentageChange: 0 }, 
        Maintenance: { labels: [], datasets: [], currentWeekTotal: 0, percentageChange: 0 }, 
        Others: { labels: [], datasets: [], currentWeekTotal: 0, percentageChange: 0 } 
    };
    const defaultDateDependent = { 
        handlerPerformance: { labels: [], datasets: [], options: {} }, 
        zonalTasks: { labels: [], datasets: [] }, 
        distribution: { labels: [], datasets: [] }, 
        taskHistory: { labels: [], datasets: [] }, 
        specificRequests: { labels: [], datasets: [] } 
    };

    const combinedData: DashboardAPIResponse = {
        weeklyTrend: trendQuery.data?.weeklyTrend || defaultWeeklyTrend,
        ...dateQuery.data || defaultDateDependent,
    } as DashboardAPIResponse; // Assert type to satisfy the compiler

    const isTrendLoading = trendQuery.isLoading || trendQuery.isFetching;
    const isDateLoading = dateQuery.isLoading || dateQuery.isFetching;
    
    const combinedError = trendQuery.error?.message || dateQuery.error?.message || null;

    return { 
        data: combinedData, 
        isTrendLoading, 
        isDateLoading, 
        error: combinedError 
    };
};