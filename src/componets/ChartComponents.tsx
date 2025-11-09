// src/components/ChartComponents.tsx
"use client";

import * as React from "react";
import { 
    Card, CardHeader, CardPreview, Title3, 
    makeStyles, shorthands, tokens,
    // Fluent UI Imports for Dropdown
    Popover, PopoverTrigger, PopoverSurface, Button,
    useId,
} from "@fluentui/react-components";
import { Bar, Doughnut, Line } from "react-chartjs-2"; 
import { 
    Chart as ChartJS, CategoryScale, LinearScale, 
    BarElement, Title, Tooltip, Legend, ArcElement, 
    PointElement, LineElement 
} from 'chart.js';

// Imports for Date Range Picker
import { DateRangePicker, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { CalendarMonthRegular } from "@fluentui/react-icons"; 

// 🚨 ASSUMED: These data functions now accept startDate and endDate
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
// 2. Styles (No change)
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
        height: '450px', 
        display: 'flex',
        flexDirection: 'column',
    },
    cardPreview: {
        flexGrow: 1, 
        position: 'relative', 
    },
    chartContainer: {
        height: '100%', 
        width: '100%',
        position: 'relative', 
    },
    doughnutContainer: {
        height: '100%', 
        width: '100%',
        textAlign: 'center',
        position: 'relative',
    },
    dateRangeContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: "20px",
    },
    dateButton: {
        fontWeight: 500,
    },
    popoverSurface: {
        maxWidth: 'fit-content',
    },
});

// =======================================================
// 3. Individual Chart Components (Updated to accept date props)
// =======================================================

// Define a common type for chart props
type ChartProps = {
    startDate: Date;
    endDate: Date;
};

const ChartWrapper: React.FC<React.PropsWithChildren<{ isDoughnut?: boolean }>> = ({ children, isDoughnut = false }) => {
    const styles = useStyles();
    return (
        <CardPreview className={styles.cardPreview}>
            <div className={isDoughnut ? styles.doughnutContainer : styles.chartContainer}>
                {children}
            </div>
        </CardPreview>
    );
};

// Chart 1: Handler Performance
// 💡 UPDATED: Pass date range to the data function
const HandlerPerformanceChart: React.FC<ChartProps> = ({ startDate, endDate }) => {
    const styles = useStyles();
    const data = React.useMemo(() => getHandlerPerformanceData(startDate, endDate), [startDate, endDate]);

    return (
        <Card className={styles.chartCard}>
            <CardHeader header={<Title3>Handler Performance: Total Tasks</Title3>} />
            <ChartWrapper>
                <Bar 
                    data={data}
                    options={{
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false, 
                        plugins: { 
                            legend: { display: false }, 
                            title: { display: true, text: `Tasks Handled (${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')})`, font: { size: 14 } } 
                        },
                        scales: { 
                            x: { grid: { display: true }, title: { display: true, text: 'Task Count' } }, 
                            y: { grid: { display: false } } 
                        }
                    }}
                />
            </ChartWrapper>
        </Card>
    );
};

// Chart 2: Task Distribution
// 💡 UPDATED: Pass date range to the data function
const TaskDistributionChart: React.FC<ChartProps> = ({ startDate, endDate }) => {
    const styles = useStyles();
    const data = React.useMemo(() => getTaskDistributionData(startDate, endDate), [startDate, endDate]);

    return (
        <Card className={styles.chartCard}>
            <CardHeader header={<Title3>Task Classification Distribution</Title3>} />
            <ChartWrapper isDoughnut>
                <Doughnut 
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false, 
                        plugins: { 
                            legend: { position: 'bottom' as const }, 
                            title: { display: true, text: `Volume Breakdown (${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')})`, font: { size: 14 } } 
                        }
                    }}
                />
            </ChartWrapper>
        </Card>
    );
};

// Chart 3: Zonal Task Volume
// 💡 UPDATED: Pass date range to the data function
const ZonalTaskVolumeChart: React.FC<ChartProps> = ({ startDate, endDate }) => {
    const styles = useStyles();
    const data = React.useMemo(() => getZonalTaskData(startDate, endDate), [startDate, endDate]);

    return (
        <Card className={styles.chartCard}>
            <CardHeader header={<Title3>Task Volume by Zone/Region</Title3>} />
            <ChartWrapper>
                <Bar
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { 
                            title: { display: true, text: `Stacked Volume (${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')})`, font: { size: 14 } }, 
                            tooltip: { mode: 'index', intersect: false } 
                        },
                        scales: { 
                            x: { stacked: true, title: { display: true, text: 'Zone / Region' } }, 
                            y: { stacked: true, title: { display: true, text: 'Task Count' } } 
                        }
                    }}
                />
            </ChartWrapper>
        </Card>
    );
};

// Chart 4: Historical Task Volume (typically less reliant on range, but included for completeness)
// 💡 UPDATED: Pass date range to the data function
const HistoryLineChart: React.FC<ChartProps> = ({ startDate, endDate }) => {
    const styles = useStyles();
    const data = React.useMemo(() => getTaskHistoryData(startDate, endDate), [startDate, endDate]);

    return (
        <Card className={styles.chartCard}>
            <CardHeader header={<Title3>Historical Daily Task Volume</Title3>} />
            <ChartWrapper>
                <Line
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            title: { display: true, text: `Task Volume over Time (${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')})`, font: { size: 14 } },
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
        </Card>
    );
};

// =======================================================
// 4. Main Export Component (Updated to pass state)
// =======================================================
export const DashboardCharts: React.FC = () => {
    const styles = useStyles();
    const buttonId = useId("date-range-popover-trigger");

    // State for date range
    const [range, setRange] = React.useState<Range[]>([
        {
            startDate: new Date(new Date().setDate(new Date().getDate() - 7)), 
            endDate: new Date(),
            key: "selection",
        },
    ]);
    
    // Extract start and end dates for easy passing to charts
    const { startDate, endDate } = range[0];

    // State for popover visibility
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    // Corrected Handler
    const handleRangeChange = (ranges: { [key: string]: Range }) => {
        setRange([ranges.selection]); 
        // setIsPopoverOpen(false); // Uncomment to close popover on selection
    };

    const formattedDateRange = `${format(startDate as Date, "MMM dd, yyyy")} - ${format(endDate as Date, "MMM dd, yyyy")}`;

    return (
        <div>
            {/* 🗓️ Date Range Dropdown Component */}
            <div className={styles.dateRangeContainer}>
                <Popover 
                    open={isPopoverOpen} 
                    onOpenChange={(e, data) => setIsPopoverOpen(data.open)} 
                    trapFocus={true} 
                    positioning="below" // CORRECTED prop name
                >
                    <PopoverTrigger disableButtonEnhancement>
                        <Button 
                            id={buttonId}
                            className={styles.dateButton} 
                            appearance="subtle"
                            icon={<CalendarMonthRegular />}
                        >
                            Date Range: **{formattedDateRange}**
                        </Button>
                    </PopoverTrigger>
                    <PopoverSurface className={styles.popoverSurface}>
                        <DateRangePicker
                            ranges={range}
                            onChange={handleRangeChange}
                            moveRangeOnFirstSelection={false}
                            showSelectionPreview={true}
                            months={2}
                            direction="horizontal"
                        />
                    </PopoverSurface>
                </Popover>
            </div>

            ---

            {/* 📊 Charts Grid - Dates are passed here */}
            <div className={styles.chartGrid}>
                <HistoryLineChart startDate={startDate as Date} endDate={endDate as Date} />
                <HandlerPerformanceChart startDate={startDate as Date} endDate={endDate as Date} />
                <TaskDistributionChart startDate={startDate as Date} endDate={endDate as Date} />
                <ZonalTaskVolumeChart startDate={startDate as Date} endDate={endDate as Date} />
            </div>
        </div>
    );
};