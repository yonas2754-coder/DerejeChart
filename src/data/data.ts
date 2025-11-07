// src/data/data.ts

import { ChartData } from "chart.js";

// --- Hardcoded Data (Simulated from your CSV analysis) ---

export const HANDLER_PERFORMANCE = [
  { handler: "Alegntaye", totalTasks: 94 },
  { handler: "Yehualaeshet", totalTasks: 82 },
  { handler: "Ermias", totalTasks: 76 },
  { handler: "Semanu", totalTasks: 49 },
  { handler: "Abdulhafiz", totalTasks: 19 },
];

export const TASK_COUNTS = {
  Provisioning: 155, // Adjusted from analysis
  Maintenance: 157,
  Others: 8,
};

export const ZONAL_TASK_DATA = [
  { Zone_Region: "CAAZ", Provisioning: 38, Maintenance: 32, Others: 5 },
  { Zone_Region: "WAAZ", Provisioning: 120, Maintenance: 70, Others: 0 },
  { Zone_Region: "EAAZ", Provisioning: 1, Maintenance: 8, Others: 0 },
  { Zone_Region: "SCAZ", Provisioning: 39, Maintenance: 0, Others: 3 },
  { Zone_Region: "CNR", Provisioning: 0, Maintenance: 2, Others: 0 },
];

// --- ChartJS Data Formatting Functions ---

// Chart 1: Handler Performance (Horizontal Bar Chart)
export const getHandlerPerformanceData = (): ChartData<"bar"> => {
    const sortedData = [...HANDLER_PERFORMANCE].sort((a, b) => b.totalTasks - a.totalTasks);
    return {
      labels: sortedData.map(d => d.handler),
      datasets: [
        {
          label: 'Total Tasks Handled',
          data: sortedData.map(d => d.totalTasks),
          backgroundColor: '#0078D4', // Microsoft Blue
        },
      ],
    };
  };
  
  // Chart 2: Task Classification Distribution (Donut Chart)
  export const getTaskDistributionData = (): ChartData<"doughnut"> => ({
    labels: Object.keys(TASK_COUNTS),
    datasets: [
      {
        data: Object.values(TASK_COUNTS),
        // Microsoft Blue, Dark Gray, Medium Gray
        backgroundColor: ['#0078D4', '#21304A', '#7F7F7F'], 
        borderWidth: 0,
      },
    ],
  });
  
  // Chart 3: Zonal Task Volume (Stacked Bar Chart)
  export const getZonalTaskData = (): ChartData<"bar"> => ({
    labels: ZONAL_TASK_DATA.map(d => d.Zone_Region),
    datasets: [
        {
            label: 'Provisioning',
            data: ZONAL_TASK_DATA.map(d => d.Provisioning),
            backgroundColor: '#0078D4',
            stack: 'Stack 1',
        },
        {
            label: 'Maintenance',
            data: ZONAL_TASK_DATA.map(d => d.Maintenance),
            backgroundColor: '#21304A',
            stack: 'Stack 1',
        },
        {
            label: 'Others',
            data: ZONAL_TASK_DATA.map(d => d.Others),
            backgroundColor: '#7F7F7F',
            stack: 'Stack 1',
        },
    ],
  });