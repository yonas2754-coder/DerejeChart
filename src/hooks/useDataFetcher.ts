// src/hooks/useDataFetcher.ts

import { ChartData } from 'chart.js';
import { useQuery } from '@tanstack/react-query';
// Note: Assuming these external types are correctly defined or imported
// import { DynamicWeeklyClassificationComparisonData, DynamicWeeklyComparisonData } from '@/data/data'; 

// --- TYPE DEFINITIONS ---
// Mock the necessary types for compilation
export interface DynamicWeeklyComparisonData {
    labels: string[];
    datasets: any[];
    currentWeekTotal: number;
    percentageChange: number;
    options: any; 
}
export interface DynamicWeeklyClassificationComparisonData {
    Provisioning: DynamicWeeklyComparisonData;
    Maintenance: DynamicWeeklyComparisonData;
    Others: DynamicWeeklyComparisonData;
}
export interface DashboardData {
    weeklyTrend: DynamicWeeklyClassificationComparisonData;
    handlerPerformance: ChartData<'bar'> & { options: any };
    zonalTasks: ChartData<'bar'>;
    distribution: ChartData<'doughnut'>;
    taskHistory: ChartData<'line'> | null;
}

// Default dummy data structure 
const defaultComparison: DynamicWeeklyComparisonData = { 
    labels: [], datasets: [], currentWeekTotal: 0, 
    percentageChange: 0, options: {} 
};

export const DEFAULT_DATA: DashboardData = {
    weeklyTrend: { 
        Provisioning: defaultComparison,
        Maintenance: defaultComparison,
        Others: defaultComparison,
    } as DynamicWeeklyClassificationComparisonData,
    handlerPerformance: { labels: [], datasets: [], options: {} },
    zonalTasks: { labels: [], datasets: [] },
    distribution: { labels: [], datasets: [] },
    taskHistory: { labels: [], datasets: [] },
};

// --- QUERY KEY ---
// Must match the key invalidated in useTickets.ts
export const DASHBOARD_COMMON_KEY = ['dashboard', 'allData']; 

// --- API Fetch Function (Query Function) ---

const fetchDashboardDataAPI = async (numWeeks: number, filterDate: Date): Promise<DashboardData> => {
    const filterDateString = filterDate.toISOString().split('T')[0];
    const url = `/api/dashboard?weeks=${numWeeks}&date=${filterDateString}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: 'No error message provided.' }));
        throw new Error(errorBody.message || `Failed to fetch data (Status: ${response.status})`);
    }

    return response.json();
};


// --- CUSTOM HOOK ---

/**
 * Custom hook to fetch all dashboard data from the consolidated API endpoint.
 * @param numWeeks The number of weeks for comparison trend charts.
 * @param filterDate The date used to filter daily charts.
 */
export const useDataFetcher = (numWeeks: number, filterDate: Date) => {
    
    const filterDateString = filterDate.toISOString().split('T')[0];

    const { data, isLoading, isFetching, isError, error, refetch } = useQuery<DashboardData, Error>({
        // Dynamic query key includes the common prefix and the parameters
        queryKey: [...DASHBOARD_COMMON_KEY, numWeeks, filterDateString],
        queryFn: () => fetchDashboardDataAPI(numWeeks, filterDate),
        staleTime: 300000, 
    });

    const dashboardData = data ? data : DEFAULT_DATA;

    return {
        data: dashboardData,
        isLoading: isLoading, 
        isFetching: isFetching,
        isError,
        error: error ? error.message : null,
        refetch,
    };
};