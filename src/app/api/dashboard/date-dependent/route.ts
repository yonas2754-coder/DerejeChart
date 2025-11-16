// src/app/api/dashboard/date-dependent/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { 
    getFilteredHandlerPerformanceData,
    getFilteredZonalTaskData,
    getTaskDistributionData,
    getTaskHistoryData,
    getSpecificRequestTypeDistribution 
} from '@/data/data'; 
import { parseISO, isValid, startOfDay, endOfDay, subDays } from 'date-fns';

/**
 * Handles GET requests to /api/dashboard/date-dependent
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');

    let selectedDate: Date;
    const DEFAULT_DATE = subDays(new Date(), 1); 

    if (!dateParam) {
        selectedDate = DEFAULT_DATE; 
    } else {
        const parsedDate = parseISO(dateParam);
        if (!isValid(parsedDate)) {
            return NextResponse.json({
                message: "Invalid date format. Expected YYYY-MM-DD.",
                success: false,
            }, { status: 400 });
        }
        selectedDate = parsedDate;
    }

    try {
        const singleDayStart = startOfDay(selectedDate);
        const singleDayEnd = endOfDay(selectedDate);

        // --- Fetch all necessary date-dependent data ---
        const handlerPerformance = await getFilteredHandlerPerformanceData(singleDayStart, singleDayEnd);
        const zonalTasks = await getFilteredZonalTaskData(singleDayStart, singleDayEnd);
        const distribution = await getTaskDistributionData(selectedDate);
        const taskHistory = await getTaskHistoryData(selectedDate); 
        const specificRequests = await getSpecificRequestTypeDistribution(selectedDate); 

        // --- Return the aggregated data ---
        return NextResponse.json({
            handlerPerformance: handlerPerformance,
            zonalTasks: zonalTasks,
            distribution: distribution,
            taskHistory: taskHistory,
            specificRequests: specificRequests, 
        });

    } catch (error) {
        console.error("Date Dependent API Error:", error);
        return NextResponse.json({
            message: (error as Error).message || "Server error fetching date-dependent data.",
            success: false,
        }, { status: 500 });
    }
}