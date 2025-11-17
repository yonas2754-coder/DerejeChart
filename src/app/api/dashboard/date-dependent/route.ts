// src/app/api/dashboard/date-dependent/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { 
    getFilteredHandlerPerformanceData,
    getFilteredZonalTaskData,
    getTaskDistributionData,
    getTaskHistoryData,
    getSpecificRequestTypeDistribution 
} from '@/data/data'; 
import { parseISO, isValid, startOfDay, subDays, addDays } from 'date-fns'; // <-- CRITICAL: Imported addDays

/**
 * Handles GET requests to /api/dashboard/date-dependent
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');

    let selectedDate: Date;
    const DEFAULT_DATE = subDays(new Date(), 1); 

    if (!dateParam) {
        // Use startOfDay to ensure a clean date object
        selectedDate = startOfDay(DEFAULT_DATE); 
    } else {
        const parsedDate = parseISO(dateParam);
        if (!isValid(parsedDate)) {
            return NextResponse.json({
                message: "Invalid date format. Expected YYYY-MM-DD.",
                success: false,
            }, { status: 400 });
        }
        // Use startOfDay to handle the date consistently at 00:00:00 UTC
        selectedDate = startOfDay(parsedDate);
    }

    try {
        // --- FIX: Define the query range using the start of the next day ---
        
        // 1. singleDayStart (Inclusive boundary: >=)
        const singleDayStart = selectedDate; 
        
        // 2. singleDayEndExclusive (Exclusive boundary: <)
        // This is the start of the next day (e.g., Nov 18 00:00:00 UTC)
        const singleDayEndExclusive = addDays(singleDayStart, 1); 

        // --- Fetch all necessary date-dependent data ---
        // CRITICAL: Update all calls to pass (singleDayStart, singleDayEndExclusive)

        const handlerPerformance = await getFilteredHandlerPerformanceData(singleDayStart, singleDayEndExclusive);
        const zonalTasks = await getFilteredZonalTaskData(singleDayStart, singleDayEndExclusive);
        
        // Updated signatures:
        const distribution = await getTaskDistributionData(singleDayStart, singleDayEndExclusive);
        const specificRequests = await getSpecificRequestTypeDistribution(singleDayStart, singleDayEndExclusive); 

        // taskHistory only needs the anchor date as it calculates its 7-day range internally:
        const taskHistory = await getTaskHistoryData(selectedDate); 
        
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