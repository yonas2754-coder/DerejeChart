// src/app/api/dashboard/weekly-trend/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getWeeklyClassificationComparisonData } from '@/data/data'; 

/**
 * Handles GET requests to /api/dashboard/weekly-trend
 * Fetches data for the long-running weekly comparison charts (KPIs and Bar Charts).
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const weeksParam = searchParams.get('weeks'); 

    let numWeeks: number = 4; // Default

    // Validate and Parse Weeks
    if (weeksParam) {
        const parsedWeeks = parseInt(weeksParam, 10);
        if (!isNaN(parsedWeeks) && parsedWeeks >= 2 && parsedWeeks <= 10) {
            numWeeks = parsedWeeks;
        }
    }

    try {
        const weeklyTrend = await getWeeklyClassificationComparisonData(numWeeks);
        
        return NextResponse.json({
            weeklyTrend: weeklyTrend,
        });

    } catch (error) {
        console.error("Weekly Trend API Error:", error);
        return NextResponse.json({
            message: (error as Error).message || "Server error fetching weekly trend data.",
            success: false,
        }, { status: 500 });
    }
}