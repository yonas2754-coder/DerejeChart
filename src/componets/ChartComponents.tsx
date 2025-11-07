// src/components/ChartComponents.tsx
"use client";

import * as React from "react";
import { 
  Card, CardHeader, CardPreview, Title3, // Title3 is the corrected component
  makeStyles, shorthands, tokens 
} from "@fluentui/react-components";
import { Bar, Doughnut } from "react-chartjs-2";
import { 
    Chart as ChartJS, CategoryScale, LinearScale, 
    BarElement, Title, Tooltip, Legend, ArcElement 
} from 'chart.js';

import { 
    getHandlerPerformanceData, 
    getTaskDistributionData, 
    getZonalTaskData 
} from "../data/data";

// Register Chart.js components
ChartJS.register(
    CategoryScale, LinearScale, BarElement, 
    Title, Tooltip, Legend, ArcElement
);

const useStyles = makeStyles({
    chartGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", 
        gap: "20px",
        ...shorthands.padding("20px", "0"),
        "@media (max-width: 1200px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
        },
        "@media (max-width: 800px)": {
            gridTemplateColumns: "1fr",
        },
    },
    chartCard: {
        ...shorthands.padding("20px"),
        boxShadow: tokens.shadow8, 
    },
});

const HandlerPerformanceChart: React.FC = () => (
    <Card className={useStyles().chartCard}>
        {/* FIX: Removed the incorrect 'size' prop. Title3 is used as a medium heading (H3). */}
        <CardHeader header={<Title3>Handler Performance: Total Tasks</Title3>} />
        <CardPreview>
            <Bar 
                data={getHandlerPerformanceData()}
                options={{
                    indexAxis: 'y',
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: 'Tasks Handled by Individual Handler', font: { size: 14 } },
                    },
                    scales: {
                        x: { grid: { display: true }, title: { display: true, text: 'Task Count' } },
                        y: { grid: { display: false } },
                    }
                }}
            />
        </CardPreview>
    </Card>
);

const TaskDistributionChart: React.FC = () => (
    <Card className={useStyles().chartCard}>
        {/* FIX: Removed the incorrect 'size' prop. */}
        <CardHeader header={<Title3>Task Classification Distribution</Title3>} />
        <CardPreview style={{ textAlign: 'center', height: '300px' }}>
            <Doughnut 
                data={getTaskDistributionData()}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' as const },
                        title: { display: true, text: 'Volume Breakdown (Total Tasks)', font: { size: 14 } },
                    }
                }}
            />
        </CardPreview>
    </Card>
);

const ZonalTaskVolumeChart: React.FC = () => (
    <Card className={useStyles().chartCard}>
        {/* FIX: Removed the incorrect 'size' prop. */}
        <CardHeader header={<Title3>Task Volume by Zone/Region</Title3>} />
        <CardPreview>
            <Bar
                data={getZonalTaskData()}
                options={{
                    responsive: true,
                    plugins: {
                        title: { display: true, text: 'Stacked Volume by Zone/Region', font: { size: 14 } },
                        tooltip: { mode: 'index', intersect: false },
                    },
                    scales: {
                        x: { stacked: true, title: { display: true, text: 'Zone / Region' } },
                        y: { stacked: true, title: { display: true, text: 'Task Count' } },
                    }
                }}
            />
        </CardPreview>
    </Card>
);


export const DashboardCharts: React.FC = () => {
    const styles = useStyles();
    return (
        <div className={styles.chartGrid}>
            <HandlerPerformanceChart />
            <TaskDistributionChart />
            <ZonalTaskVolumeChart />
        </div>
    );
};