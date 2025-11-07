// src/components/ChartComponents.tsx
"use client";

import * as React from "react";
import { 
  Card, CardHeader, CardPreview, Title3, 
  makeStyles, shorthands, tokens, Button, 
} from "@fluentui/react-components";
// 🟢 FIX: Corrected icon import from Download24Regular to ArrowDownload24Regular
import { ArrowDownload24Regular } from "@fluentui/react-icons"; 
import { Bar, Doughnut, Line } from "react-chartjs-2"; 
import { 
    Chart as ChartJS, CategoryScale, LinearScale, 
    BarElement, Title, Tooltip, Legend, ArcElement, 
    PointElement, LineElement 
} from 'chart.js';

import { 
    getHandlerPerformanceData, 
    getTaskDistributionData, 
    getZonalTaskData, 
    getTaskHistoryData 
} from "../data/data";

// =======================================================
// 1. Chart.js Setup
// =======================================================
ChartJS.register(
    CategoryScale, LinearScale, BarElement, 
    Title, Tooltip, Legend, ArcElement,
    PointElement, LineElement
);

// =======================================================
// 2. Styles (Professional Vertical Expansion)
// =======================================================

const useStyles = makeStyles({
    chartGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)", 
        gap: "20px",
        ...shorthands.padding("20px", "0"),
        
        "@media (max-width: 992px)": { 
            gridTemplateColumns: "1fr",
        },
    },
    chartCard: {
        ...shorthands.padding("20px"),
        boxShadow: tokens.shadow8, 
        // Set a consistent height and enable Flexbox for vertical expansion
        height: '450px', 
        display: 'flex',
        flexDirection: 'column',
    },
    cardHeader: {
        // Ensures the title and button are on opposite sides
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        // Ensures the title takes precedence
        flexGrow: 1,
    },
    
    // Ensure CardPreview expands vertically to fill remaining space
    cardPreview: {
        flexGrow: 1, 
        position: 'relative', 
    },

    // Ensure inner chart container takes 100% of the CardPreview height
    chartContainer: {
        height: '100%', 
        width: '100%',
        position: 'relative', 
    },
    // Specific style for the Doughnut chart container
    doughnutContainer: {
        height: '100%', 
        width: '100%',
        textAlign: 'center',
        position: 'relative',
    }
});

// =======================================================
// 3. Reusable Download Function (Enterprise Feature)
// =======================================================

const downloadChart = (ref: React.RefObject<any>, fileName: string) => {
    if (ref.current && ref.current.canvas) {
        const canvas = ref.current.canvas as HTMLCanvasElement;
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        
        // Clean filename for download
        link.download = `${fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
        link.href = image;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

// =======================================================
// 4. Chart Wrapper Component (Handles Header and Download)
// =======================================================

type ChartWrapperProps = React.PropsWithChildren<{
    title: string;
    chartRef: React.RefObject<any>;
    isDoughnut?: boolean;
}>;

const ChartWrapper: React.FC<ChartWrapperProps> = ({ children, isDoughnut = false, title, chartRef }) => {
    const styles = useStyles();
    
    const handleDownload = () => {
        downloadChart(chartRef, title);
    };
    
    return (
        <Card className={styles.chartCard}>
            <div className={styles.cardHeader}>
                <Title3 className={styles.cardTitle}>{title}</Title3>
                <Button 
                    appearance="subtle"
                    // 🟢 FIX: Use the corrected icon name
                    icon={<ArrowDownload24Regular />} 
                    onClick={handleDownload}
                    title={`Download ${title} as PNG`}
                >
                    Download
                </Button>
            </div>
            
            <CardPreview className={styles.cardPreview}>
                <div className={isDoughnut ? styles.doughnutContainer : styles.chartContainer}>
                    {children}
                </div>
            </CardPreview>
        </Card>
    );
};


// Chart 1: Handler Performance (Horizontal Bar Chart)
const HandlerPerformanceChart: React.FC = () => {
    const chartRef = React.useRef(null);
    const title = "Handler Performance: Total Tasks";

    return (
        <ChartWrapper title={title} chartRef={chartRef}>
            <Bar 
                ref={chartRef}
                data={getHandlerPerformanceData()}
                options={{
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false, 
                    plugins: { 
                        legend: { display: false }, 
                        title: { display: true, text: 'Tasks Handled by Individual Handler', font: { size: 14 } } 
                    },
                    scales: { 
                        x: { grid: { display: true }, title: { display: true, text: 'Task Count' } }, 
                        y: { grid: { display: false } } 
                    }
                }}
            />
        </ChartWrapper>
    );
};

// Chart 2: Task Classification Distribution (Doughnut Chart)
const TaskDistributionChart: React.FC = () => {
    const chartRef = React.useRef(null);
    const title = "Task Classification Distribution";
    
    return (
        <ChartWrapper title={title} chartRef={chartRef} isDoughnut>
            <Doughnut 
                ref={chartRef}
                data={getTaskDistributionData()}
                options={{
                    responsive: true,
                    maintainAspectRatio: false, 
                    plugins: { 
                        legend: { position: 'bottom' as const }, 
                        title: { display: true, text: 'Volume Breakdown (Total Tasks)', font: { size: 14 } } 
                    }
                }}
            />
        </ChartWrapper>
    );
};

// Chart 3: Zonal Task Volume (Stacked Bar Chart)
const ZonalTaskVolumeChart: React.FC = () => {
    const chartRef = React.useRef(null);
    const title = "Task Volume by Zone/Region";
    
    return (
        <ChartWrapper title={title} chartRef={chartRef}>
            <Bar
                ref={chartRef}
                data={getZonalTaskData()}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        title: { display: true, text: 'Stacked Volume by Zone/Region', font: { size: 14 } }, 
                        tooltip: { mode: 'index', intersect: false } 
                    },
                    scales: { 
                        x: { stacked: true, title: { display: true, text: 'Zone / Region' } }, 
                        y: { stacked: true, title: { display: true, text: 'Task Count' } } 
                    }
                }}
            />
        </ChartWrapper>
    );
};

// Chart 4: Historical Task Volume (Time Series Line Chart)
const HistoryLineChart: React.FC = () => {
    const chartRef = React.useRef(null);
    const title = "Historical Daily Task Volume";
    
    return (
        <ChartWrapper title={title} chartRef={chartRef}>
            <Line
                ref={chartRef}
                data={getTaskHistoryData()}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: 'Task Volume over Time (Last 7 Days)', font: { size: 14 } },
                    },
                    scales: {
                        x: { grid: { display: false }, title: { display: true, text: 'Date' } },
                        y: { 
                            grid: { display: true }, 
                            title: { display: true, text: 'Task Count' },
                            min: 0, 
                        },
                    }
                }}
            />
        </ChartWrapper>
    );
};

// =======================================================
// 5. Main Export Component
// =======================================================

export const DashboardCharts: React.FC = () => {
    const styles = useStyles();
    return (
        <div className={styles.chartGrid}>
            <HistoryLineChart />
            <HandlerPerformanceChart />
            <TaskDistributionChart />
            <ZonalTaskVolumeChart />
        </div>
    );
};