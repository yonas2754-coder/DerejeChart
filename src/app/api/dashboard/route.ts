// src/app/api/dashboard/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { 
    getWeeklyClassificationComparisonData, 
    getFilteredHandlerPerformanceData,
    getFilteredZonalTaskData,
    getTaskDistributionData,
    getTaskHistoryData
} from '@/data/data'; // Adjust the import path if necessary
import { parseISO, isValid, startOfWeek, endOfWeek, subWeeks, startOfDay, endOfDay } from 'date-fns';

/**
 * Handles GET requests to /api/dashboard
 * Fetches and aggregates all dashboard data based on query parameters.
 */
export async function GET(request: NextRequest) {
    
    // 1. Parse URL parameters
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');
    const weeksParam = searchParams.get('weeks');

    // --- Date Validation & Setup ---
    let selectedDate: Date;
    let numWeeks: number = 2;

    try {
        // Validate dateParam
        if (!dateParam) {
            throw new Error("Missing 'date' query parameter.");
        }
        
        selectedDate = parseISO(dateParam);
        if (!isValid(selectedDate)) {
            throw new Error(`Invalid date format: ${dateParam}`);
        }
        
        // Ensure we are working with the start/end of the single selected day for consistency
        const singleDayStart = startOfDay(selectedDate);
        const singleDayEnd = endOfDay(selectedDate);

        // Validate weeksParam
        if (weeksParam) {
            const parsedWeeks = parseInt(weeksParam, 10);
            if (isNaN(parsedWeeks) || parsedWeeks < 2 || parsedWeeks > 6) {
                // Use a default or throw a specific error
                console.warn(`Invalid 'weeks' parameter: ${weeksParam}. Defaulting to 2.`);
                numWeeks = 2;
            } else {
                numWeeks = parsedWeeks;
            }
        }
        
        // --- 2. Fetch all necessary data ---
        
        // A. Weekly Trend Data (Uses numWeeks)
        const weeklyTrend = await getWeeklyClassificationComparisonData(numWeeks);

        // B. Date-Filtered Charts (Uses selectedDate)
        // Note: For consistency with the client code, we pass the selected day twice 
        // to filter functions designed for a date range (start/end).
        const handlerPerformance = await getFilteredHandlerPerformanceData(singleDayStart, singleDayEnd);
        const zonalTasks = await getFilteredZonalTaskData(singleDayStart, singleDayEnd);
        const distribution = await getTaskDistributionData(selectedDate);

        // C. History Chart (Independent of numWeeks/selectedDate)
        const taskHistory = await getTaskHistoryData();

        // --- 3. Return the aggregated data ---
        return NextResponse.json({
            weeklyTrend: weeklyTrend,
            handlerPerformance: handlerPerformance,
            zonalTasks: zonalTasks,
            distribution: distribution,
            taskHistory: taskHistory,
        });

    } catch (error) {
        console.error("API Fetch Error:", error);
        // Return a standardized error response
        return NextResponse.json({
            message: (error as Error).message || "An unknown error occurred on the server.",
            success: false,
        }, { status: 500 });
    }
}