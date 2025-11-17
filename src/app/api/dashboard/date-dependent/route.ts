// src/app/api/dashboard/date-dependent/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { 
    getFilteredHandlerPerformanceData,
    getFilteredZonalTaskData,
    getTaskDistributionData,
    getTaskHistoryData,
    getSpecificRequestTypeDistribution 
} from '@/data/data'; 
import { parseISO, isValid, subDays, addDays, format } from 'date-fns'; 

// CRITICAL UTC HELPER: Parses 'YYYY-MM-DD' string directly into a 00:00:00 UTC Date object.
// This ensures the date object is consistent across all environments (local and Vercel).
const parseDateStringAsUTC = (dateString: string): Date => {
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const day = parseInt(parts[2], 10);

    // Creates a date object whose time components are 00:00:00 UTC
    return new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
};

/**
 * Handles GET requests to /api/dashboard/date-dependent
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');

    let selectedDate: Date;
    
    // Calculate default date one day ago, formatted as YYYY-MM-DD
    const defaultDateString = format(subDays(new Date(), 1), 'yyyy-MM-dd');

    if (!dateParam) {
        // If no date is provided, use the UTC-locked default date
        selectedDate = parseDateStringAsUTC(defaultDateString); 
    } else {
        // Use date-fns for basic validation before parsing as UTC
        if (!isValid(parseISO(dateParam))) {
            return NextResponse.json({
                message: "Invalid date format. Expected YYYY-MM-DD.",
                success: false,
            }, { status: 400 });
        }
        // FIX: Force date parsing to 00:00:00 UTC
        selectedDate = parseDateStringAsUTC(dateParam);
    }

    try {
        // The dates are now guaranteed to be UTC 00:00:00
        const singleDayStart = selectedDate; 
        const singleDayEndExclusive = addDays(singleDayStart, 1); 

        // --- Fetch all necessary date-dependent data (passing UTC boundaries) ---
        const handlerPerformance = await getFilteredHandlerPerformanceData(singleDayStart, singleDayEndExclusive);
        const zonalTasks = await getFilteredZonalTaskData(singleDayStart, singleDayEndExclusive);
        const distribution = await getTaskDistributionData(singleDayStart, singleDayEndExclusive);
        const specificRequests = await getSpecificRequestTypeDistribution(singleDayStart, singleDayEndExclusive); 

        // taskHistory only needs the UTC-locked date as its anchor
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