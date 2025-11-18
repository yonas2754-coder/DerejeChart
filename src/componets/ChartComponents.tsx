"use client";

import * as React from "react";
import { 
    Card, CardHeader, CardPreview, Title3, Title1,
    makeStyles, shorthands, tokens, mergeClasses, 
    Button, Label, Divider, Text, Slider,
    Field, Spinner,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat"; 
import { Bar, Doughnut, Line, ChartProps } from "react-chartjs-2"; // Added ChartProps for completeness
import { 
    Chart as ChartJS, CategoryScale, LinearScale, 
    BarElement, Title, Tooltip, Legend, ArcElement, 
    PointElement, LineElement, Chart, ChartOptions, ChartData, ChartDataset 
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { format, subDays } from "date-fns";

// Import Icons
import { 
    ArrowDownloadRegular, ArrowUpRegular, ArrowDownRegular, 
    SettingsRegular, EqualOffRegular, CalendarMonthRegular 
} from "@fluentui/react-icons";

import { 
    useDashboardData, 
    DashboardAPIResponse, 
    TaskType,
    WeeklyTrendAPIResponse,
} from "@/hooks/useDashboardData"; 

// =======================================================
// Chart.js Setup
// =======================================================
ChartJS.register(
    CategoryScale, LinearScale, BarElement, 
    Title, Tooltip, Legend, ArcElement, 
    PointElement, LineElement,
    ChartDataLabels
);


// =======================================================
// Styles & Helpers
// =======================================================
const useStyles = makeStyles({
    chartGrid: {
        display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", 
        ...shorthands.padding("24px", "0"),
        "@media (max-width: 992px)": { gridTemplateColumns: "1fr", gap: "16px", },
    },
    // Standard Card Height (e.g., 480px)
    chartCard: {
        boxShadow: tokens.shadow16, ...shorthands.padding("16px"), height: "480px", 
        display: "flex", flexDirection: "column", ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
    // Card that is approximately twice the height (960px)
    doubleHeightCard: { 
        boxShadow: tokens.shadow16, ...shorthands.padding("16px"), height: "960px", 
        display: "flex", flexDirection: "column", ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
    kpiCard: {
        boxShadow: tokens.shadow8, ...shorthands.padding("16px"), height: "150px", 
        display: "flex", flexDirection: "column", justifyContent: "space-between", 
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
    kpiGrid: {
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", 
        ...shorthands.padding("0", "0", "24px", "0"),
        "@media (max-width: 992px)": { gridTemplateColumns: "1fr", gap: "16px", },
    },
    cardPreview: {
        flexGrow: 1, ...shorthands.padding("0"),
    },
    chartContainer: {
        height: "100%", width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    controlBar: {
        backgroundColor: tokens.colorNeutralBackground1, ...shorthands.padding("12px", "20px"),
        ...shorthands.borderRadius(tokens.borderRadiusMedium), boxShadow: tokens.shadow8, marginBottom: "20px",
    },
    controlGroup: {
        display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap',
    },
    sliderContainer: { minWidth: '220px', flexShrink: 0, },
    cardHeaderWithAction: {
        display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", 
        ...shorthands.margin("0", "0", "8px", "0"),
    },
    sectionTitle: {
        ...shorthands.margin("20px", "0", "10px", "0"), color: tokens.colorNeutralForeground1,
    },
    kpiValue: {
        fontWeight: 600, fontSize: tokens.fontSizeHero700, lineHeight: tokens.lineHeightHero700,
    },
    kpiChange: {
        display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600,
    },
    kpiTrendPositive: { color: tokens.colorPaletteGreenForeground1, },
    kpiTrendNegative: { color: tokens.colorPaletteRedForeground1, },
    kpiTrendNeutral: { color: tokens.colorNeutralForeground3, },
    dateControl: { display: 'flex', alignItems: 'center', gap: '12px', },
    resetButton: { marginTop: '18px', },
    loadingOverlay: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 10,
    }
});

const downloadChartImage = (chartRef: React.RefObject<Chart | null>, fileName: string) => {
    const chart = chartRef.current;
    if (chart) {
        // Use chart.toBase64Image for downloading
        const image = chart.toBase64Image("image/png", 1);
        const a = document.createElement('a');
        a.href = image; a.download = fileName + '.png';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
    } else { console.error("Chart instance not found."); }
};

const ChartWrapper: React.FC<React.PropsWithChildren<{ isLoading: boolean }>> = ({ children, isLoading }) => {
    const styles = useStyles();
    return (
        <CardPreview className={styles.cardPreview} style={{ position: 'relative' }}>
            <div className={styles.chartContainer}>
                {children}
            </div>
            {isLoading && (
                <div className={styles.loadingOverlay}>
                    <Spinner label="Loading Data..." />
                </div>
            )}
        </CardPreview>
    );
};

// =======================================================
// KPI Card Component
// =======================================================
interface KpiCardProps {
    taskType: TaskType;
    chartData: WeeklyTrendAPIResponse['weeklyTrend'][TaskType]; 
    numWeeks: number;
    isLoading: boolean;
}

const KpiCard: React.FC<KpiCardProps> = ({ taskType, chartData, numWeeks, isLoading }) => {
    const styles = useStyles();
    const { currentWeekTotal, percentageChange } = chartData;
    
    const isPositiveChange = percentageChange > 0;
    const isNeutral = percentageChange === 0 || percentageChange === -999.9; 
    
    const trendClass = isNeutral 
        ? styles.kpiTrendNeutral
        : isPositiveChange 
            ? styles.kpiTrendPositive 
            : styles.kpiTrendNegative;

    const trendIcon = isNeutral 
        ? <EqualOffRegular /> 
        : isPositiveChange 
            ? <ArrowUpRegular /> // ArrowUpRegular for positive growth
            : <ArrowDownRegular />; // ArrowDownRegular for negative growth
            
    const referenceLabel = numWeeks === 2 ? 'Last Week' : `Prior ${numWeeks - 1} Wk Avg`;
    const percentageText = percentageChange === -999.9 
        ? '∞ %' 
        : (percentageChange === 0 ? '±0%' : `${Math.abs(percentageChange).toFixed(1)}%`);

    return (
        <Card className={styles.kpiCard} style={{ position: 'relative' }}> 
            <Title3>{taskType} Tasks</Title3>
            <Title1 className={styles.kpiValue}>{currentWeekTotal}</Title1>
            <div className={styles.kpiChange}>
                <Text className={trendClass}>{trendIcon}</Text>
                <Text className={trendClass}>
                    {percentageText}
                </Text>
                <Text size={200} className={styles.kpiTrendNeutral}>
                    vs. {referenceLabel}
                </Text>
            </div>
            {/* KPI Loading Overlay (uses isTrendLoading) */}
            {isLoading && (
                <div className={styles.loadingOverlay}>
                    <Spinner size="medium" label="Loading Data..." />
                </div>
            )}
        </Card>
    );
};


// =======================================================
// Task Comparison Chart Card (Weekly Trend)
// =======================================================
interface TaskComparisonChartProps {
    taskType: TaskType;
    chartData: WeeklyTrendAPIResponse['weeklyTrend'][TaskType]; 
    numWeeks: number; 
    isLoading: boolean;
}

const TaskComparisonChartCard: React.FC<TaskComparisonChartProps> = ({ taskType, chartData, numWeeks, isLoading }) => {
    const styles = useStyles();
    const chartRef = React.useRef<Chart<'bar'>>(null);
    const chartTitle = `${taskType} Trend`;
    
    const referenceLabel = numWeeks === 2 ? 'vs. Last Week' : `vs. Prior ${numWeeks - 1} Wk Avg`;

    const handleDownload = () => {
        downloadChartImage(chartRef, `${taskType}_${numWeeks}_Week_Trend_Chart`);
    };

    const chartOptions: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: false }, // FIX: Removed internal chart title to prevent overlap with CardHeader title
            tooltip: {
                callbacks: {
                    title: (context) => context[0].label, 
                    label: (context) => `Total Tasks: ${context.formattedValue}`, 
                    afterBody: (context) => {
                        // Logic for displaying percentage change in the tooltip for the current week only
                        if (context[0].dataIndex === chartData.labels.length - 1) {
                            const percentage = chartData.percentageChange;
                            const sign = percentage >= 0 ? '▲' : '▼'; 
                            const indicator = percentage === 0 
                                ? '±0%' 
                                : (percentage === -999.9 ? '∞ %' : `${sign}${Math.abs(percentage).toFixed(1)}%`);
                            return `\nOverall ${referenceLabel}: ${indicator}`;
                        }
                        return '';
                    }
                }
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                offset: 4,
                formatter: (value: number, context) => {
                    const isCurrentWeek = context.dataIndex === chartData.labels.length - 1;
                    if (isCurrentWeek) {
                        return value.toString(); // Show count for current week
                    } 
                    
                    // Logic to display change vs. current week for past weeks (Advanced)
                    const currentWeekTotal = chartData.currentWeekTotal;
                    const priorWeekTotal = value;
                    
                    if (priorWeekTotal === 0 && currentWeekTotal === 0) { return 'N/A'; }
                    
                    if (priorWeekTotal === 0 && currentWeekTotal > 0) { return `+${currentWeekTotal} T`; }
                    if (currentWeekTotal === 0 && priorWeekTotal > 0) { return `-${priorWeekTotal} T`; }
                    
                    const percentage = ((priorWeekTotal - currentWeekTotal) / priorWeekTotal) * 100;
                    const absPercentage = Math.abs(percentage);
                    const sign = percentage > 0 ? '▼' : (percentage < 0 ? '▲' : '±');
                    
                    return [`${sign}${absPercentage.toFixed(1)}%`, `Total: ${value}`];
                },
                color: (context) => {
                    const isCurrentWeek = context.dataIndex === chartData.labels.length - 1;
                    if (isCurrentWeek) { return tokens.colorNeutralForeground1; } 
                    
                    const priorWeekTotal = context.dataset.data[context.dataIndex] as number;
                    const currentWeekTotal = chartData.currentWeekTotal;
                    
                    if (priorWeekTotal === 0 && currentWeekTotal === 0) { return tokens.colorNeutralForeground3; }
                    if (priorWeekTotal === 0 && currentWeekTotal > 0) { return tokens.colorPaletteRedForeground1; }
                    if (currentWeekTotal === 0 && priorWeekTotal > 0) { return tokens.colorPaletteGreenForeground1; }

                    const percentage = ((priorWeekTotal - currentWeekTotal) / priorWeekTotal) * 100;
                    if (percentage > 0) { return tokens.colorPaletteGreenForeground1; } 
                    if (percentage < 0) { return tokens.colorPaletteRedForeground1; } 
                    return tokens.colorNeutralForeground3;
                },
                font: { weight: 'bold' as const, size: 10, },
            }
        },
        scales: {
            x: { title: { display: true, text: 'Week' }, grid: { display: false } },
            y: { title: { display: true, text: 'Total Task Count' }, min: 0 }
        },
    };
    
    // Apply bar thickness directly to the dataset
    const updatedDatasets = chartData.datasets.map(dataset => ({
        ...dataset,
        maxBarThickness: 40, // Applied maxBarThickness
    }));

    const updatedChartData = {
        ...chartData,
        datasets: updatedDatasets
    };

    return (
        <Card className={styles.chartCard}>
            <CardHeader header={<div className={styles.cardHeaderWithAction}>
                <Title3>{chartTitle}</Title3>
                <Button appearance="subtle" icon={<ArrowDownloadRegular />} onClick={handleDownload} size="small"/>
            </div>} />
            <ChartWrapper isLoading={isLoading}>
                <Bar ref={chartRef} data={updatedChartData} options={chartOptions}/>
            </ChartWrapper>
        </Card>
    );
};


// =======================================================
// Date Dependent Charts
// =======================================================

const HandlerPerformanceChart: React.FC<{ data: DashboardAPIResponse; selectedDate: Date; isLoading: boolean }> = ({ data, selectedDate, isLoading }) => {
    const styles = useStyles();
    const chartRef = React.useRef<Chart<"bar">>(null);
    const chartTitle = "Handler Performance: Total Tasks (Stacked)";
    const handleDownload = () => downloadChartImage(chartRef, 'Handler_Performance_Chart');

    // Apply bar thickness directly to the dataset
    const updatedDatasets = data.handlerPerformance.datasets.map(dataset => ({
        ...dataset,
        maxBarThickness: 40, // Applied maxBarThickness
    }));

    const updatedChartData = {
        ...data.handlerPerformance,
        datasets: updatedDatasets
    };

    return (
        <Card className={styles.chartCard}>
            <CardHeader header={<div className={styles.cardHeaderWithAction}>
                <Title3>{chartTitle}</Title3>
                <Button appearance="subtle" icon={<ArrowDownloadRegular />} onClick={handleDownload} size="small"/>
            </div>} />
            <ChartWrapper isLoading={isLoading}>
                <Bar ref={chartRef} data={updatedChartData} options={{
                    indexAxis: 'y', responsive: true, maintainAspectRatio: false, 
                    plugins: { 
                        legend: { display: true, position: 'bottom' as const }, 
                        title: { display: false } // FIX: Removed internal chart title to prevent overlap
                    },
                    scales: { 
                        x: { stacked: true, grid: { display: true }, title: { display: true, text:'Task Count' } }, 
                        y: { stacked: true, grid: { display: false } } 
                    }
                }}/>
            </ChartWrapper>
        </Card>
    );
};

const ZonalTaskVolumeChart: React.FC<{ data: DashboardAPIResponse; selectedDate: Date; isLoading: boolean }> = ({ data, selectedDate, isLoading }) => {
    const styles = useStyles();
    const chartRef = React.useRef<Chart<"bar">>(null);
    const chartTitle = "Task Volume by Zone/Region (Grouped)";
    const handleDownload = () => downloadChartImage(chartRef, 'Zonal_Task_Volume_Chart');
    
    // Apply bar thickness directly to the dataset
    const updatedDatasets = data.zonalTasks.datasets.map(dataset => ({
        ...dataset,
        maxBarThickness: 40, // Applied maxBarThickness
    }));

    const updatedChartData = {
        ...data.zonalTasks,
        datasets: updatedDatasets
    };


    return (
        <Card className={styles.chartCard}>
            <CardHeader header={<div className={styles.cardHeaderWithAction}>
                <Title3>{chartTitle}</Title3>
                <Button appearance="subtle" icon={<ArrowDownloadRegular />} onClick={handleDownload} size="small"/>
            </div>} />
            <ChartWrapper isLoading={isLoading}>
                <Bar ref={chartRef} data={updatedChartData} options={{ 
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom' as const },
                                    title: { display: false } // FIX: Removed internal chart title to prevent overlap
                    } 
                }} />
            </ChartWrapper>
        </Card>
    );
};

const TaskDistributionChart: React.FC<{ data: DashboardAPIResponse; selectedDate: Date; isLoading: boolean }> = ({ data, selectedDate, isLoading }) => {
    const styles = useStyles();
    const chartRef = React.useRef<Chart<"doughnut">>(null);
    const chartTitle = "Task Classification Distribution (Prov., Maint., Other)";
    const handleDownload = () => downloadChartImage(chartRef, `Task_Distribution_Chart_${format(selectedDate, 'yyyyMMdd')}`);

    return (
        <Card className={styles.chartCard}>
            <CardHeader header={<div className={styles.cardHeaderWithAction}>
                <Title3>{chartTitle}</Title3>
                <Button appearance="subtle" icon={<ArrowDownloadRegular />} onClick={handleDownload} size="small"/>
            </div>} />
            <ChartWrapper isLoading={isLoading}>
                <Doughnut ref={chartRef} data={data.distribution} options={{ 
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom' as const },
                                    title: { display: false } // FIX: Removed internal chart title to prevent overlap
                    }
                }} />
            </ChartWrapper>
        </Card>
    );
};

// Define a set of distinct colors for the different bars
const SPECIFIC_REQUEST_COLORS = [
    'rgba(0, 120, 212, 0.8)', 
    'rgba(0, 179, 89, 0.8)', 
    'rgba(255, 185, 0, 0.8)', 
    'rgba(237, 85, 18, 0.8)', 
    'rgba(142, 63, 173, 0.8)', 
    'rgba(0, 183, 195, 0.8)', 
    'rgba(193, 220, 0, 0.8)', 
    'rgba(164, 38, 44, 0.8)', 
    'rgba(100, 100, 100, 0.8)', 
];


const SpecificRequestTypeDistributionChart: React.FC<{ data: DashboardAPIResponse; selectedDate: Date; isLoading: boolean; className?: string }> = ({ data, selectedDate, isLoading, className }) => {
    const styles = useStyles();
    const chartRef = React.useRef<Chart<"bar">>(null); 
    const chartTitle = "Specific Request Type Distribution";
    const handleDownload = () => downloadChartImage(chartRef, `Specific_Request_Distribution_Bar_Chart_${format(selectedDate, 'yyyyMMdd')}`);

    // Memoize the chart data transformation to ensure performance
    const chartData: ChartData<"bar", number[], string> = React.useMemo(() => {
        
        // FIX: Safely access labels and cast them to string[]
        const labels: string[] = (data.specificRequests?.labels as string[] | undefined) || []; 
        
        // FIX: Safely access rawData and cast them to number[]
        const rawData: number[] = (data.specificRequests?.datasets[0]?.data as number[] | undefined) || []; 

        if (labels.length === 0) {
            // Must return the fully typed empty structure
            return { labels: [], datasets: [] };
        }

        // Generate one dataset per label/bar to get a legend item for each color (sparse data approach)
        const datasets: ChartDataset<"bar", number[]>[] = labels.map((label, index) => {
            const color = SPECIFIC_REQUEST_COLORS[index % SPECIFIC_REQUEST_COLORS.length];
            const borderColor = color.replace('0.8', '1');
            
            // Create a sparse data array where only the corresponding index has the value
            const sparseData: (number | null)[] = new Array(labels.length).fill(null);
            sparseData[index] = rawData[index];

            return {
                label: label, 
                // data must be cast to (number | null)[] which is compatible with number[] for ChartJS
                data: sparseData as number[], 
                backgroundColor: color,
                borderColor: borderColor, 
                borderWidth: 1,
                maxBarThickness: 40,
            };
        });

        // The final return object satisfies ChartData<"bar", number[], string>
        return {
            labels: labels, // string[]
            datasets: datasets, // ChartDataset<"bar", number[]>[]
        };
        
    }, [data.specificRequests]);


    return (
        // Use the doubleHeightCard style
        <Card className={mergeClasses(styles.doubleHeightCard, className)} style={{ position: 'relative' }}>
            <CardHeader header={<div className={styles.cardHeaderWithAction}>
                <Title3>{chartTitle}</Title3>
                <Button appearance="subtle" icon={<ArrowDownloadRegular />} onClick={handleDownload} size="small"/>
            </div>} />
            <ChartWrapper isLoading={isLoading}>
                <Bar ref={chartRef} data={chartData} options={{ 
                    indexAxis: 'x', // Vertical Bar Chart
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { 
                            display: true, 
                            position: 'bottom', 
                            labels: { padding: 10 }
                        },
                        title: { display: false }, // FIX: Removed internal chart title to prevent overlap
                        tooltip: {
                            // Tooltip customized for sparse data
                            callbacks: {
                                title: (context) => context[0].label,
                                // context.raw is null for sparse data, context.parsed.y is the value
                                label: (context) => `${context.dataset.label}: ${context.parsed.y || 0} Tasks`
                            }
                        }
                    },
                    scales: {
                        x: { 
                            title: { display: true, text: 'Specific Request Type', padding: 10 }, // FIX: Added padding to x-axis title
                            stacked: true, // Makes the single bars overlay correctly
                            ticks: { 
                                autoSkip: false, 
                                maxRotation: 45, 
                                minRotation: 45 // Enforce 45-degree rotation
                            } 
                        }, 
                        y: { 
                            display: true, 
                            title: { display: true, text: 'Number of Tasks' }, 
                            min: 0,
                            stacked: true, // Stacks the scale
                        } 
                    }
                }} />
            </ChartWrapper>
        </Card>
    );
};


const HistoryLineChart: React.FC<{ data: DashboardAPIResponse; isLoading: boolean }> = ({ data, isLoading }) => {
    const styles = useStyles();
    const chartRef = React.useRef<Chart<"line">>(null);
    const chartTitle = "Historical Daily Task Volume (Last 7 Days)";
    const handleDownload = () => downloadChartImage(chartRef, 'Historical_Daily_Task_Volume_Chart');

    return (
        <Card className={styles.chartCard}>
            <CardHeader header={<div className={styles.cardHeaderWithAction}>
                <Title3>{chartTitle}</Title3>
                <Button appearance="subtle" icon={<ArrowDownloadRegular />} onClick={handleDownload} size="small"/>
            </div>} />
            <ChartWrapper isLoading={isLoading}>
                <Line ref={chartRef} data={data.taskHistory} options={{
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false }, title: { display: false } }, // FIX: Removed internal chart title to prevent overlap
                    scales: {
                        x: { grid: { display: false }, title: { display: true, text: 'Date' } },
                        y: { grid: { display: true }, title: { display: true, text: 'Task Count' }, min: 0 },
                    }
                }}/>
            </ChartWrapper>
        </Card>
    );
};

// =======================================================
// Main Component: DashboardCharts 
// =======================================================

const DEFAULT_DATE = subDays(new Date(), 1); 

export const DashboardCharts: React.FC = () => {
    const styles = useStyles();
    
    const [numWeeks, setNumWeeks] = React.useState(2); 
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(DEFAULT_DATE);
    const currentFilterDate = selectedDate || DEFAULT_DATE;

    // Destructure separate loading flags: isTrendLoading and isDateLoading
    const { 
        data, 
        isTrendLoading, 
        isDateLoading, 
        error 
    } = useDashboardData(currentFilterDate, numWeeks); 

    const handleDateChange = (date: Date | null | undefined) => {
        setSelectedDate(date === null ? undefined : date);
    };
    
    const handleResetDate = () => {
        setSelectedDate(DEFAULT_DATE);
    };

    if (error) {
        return (
            <div style={{ padding: "20px", color: tokens.colorPaletteRedForeground1 }}>
                <Title3>🚨 Data Fetch Error</Title3>
                <Text>{error}</Text>
                <Button onClick={() => window.location.reload()} style={{ marginTop: '10px' }}>Reload Dashboard</Button>
            </div>
        );
    }
    
    const { weeklyTrend } = data;

    return (
        <div style={{ padding: "20px" }}>
            
            {/* Enterprise Control Bar */}
            <div className={styles.controlBar}>
                <div className={styles.controlGroup}>
                    
                    {/* Calendar/Date Picker Implementation */}
                    <div className={styles.dateControl}>
                        <Field label="Filter Date" style={{minWidth: '200px'}}>
                            <DatePicker
                                value={currentFilterDate}
                                onSelectDate={handleDateChange} 
                                placeholder="Select a date..."
                                formatDate={(date: Date | undefined): string => {
                                    return date ? format(date, 'MMM dd, yyyy') : '';
                                }}
                            />
                        </Field>
                        <Button appearance="subtle" size="medium" icon={<CalendarMonthRegular />}
                            onClick={handleResetDate} className={styles.resetButton} aria-label="Reset Date to Default"
                        >
                            Reset
                        </Button>
                    </div>

                    <Divider vertical />

                    {/* Comparison Week Slider */}
                    <div className={styles.sliderContainer}>
                        <Label htmlFor="num-weeks-slider">Weekly Trend Analysis (Weeks)</Label>
                        <Slider
                            id="num-weeks-slider"
                            min={2} max={6} step={1} value={numWeeks}
                            onChange={(e, data) => setNumWeeks(data.value)}
                            aria-valuetext={`${numWeeks} Weeks`}
                        />
                        <div style={{ fontSize: '12px', color: tokens.colorNeutralForeground2 }}>
                            Viewing **{numWeeks}** weeks of data for comparison.
                        </div>
                    </div>

                    <Divider vertical />

                    {/* Settings/Configuration Button (Placeholder) */}
                    <Button appearance="subtle" icon={<SettingsRegular />} aria-label="Dashboard Settings">
                        Settings
                    </Button>
                </div>
            </div>
            
            
            {/* KPI Section - Uses isTrendLoading */}
            <Title3 className={styles.sectionTitle}>Current Week Summary & Comparison</Title3>
            <div className={styles.kpiGrid}>
                <KpiCard taskType="Provisioning" chartData={weeklyTrend.Provisioning} numWeeks={numWeeks} isLoading={isTrendLoading} />
                <KpiCard taskType="Maintenance" chartData={weeklyTrend.Maintenance} numWeeks={numWeeks} isLoading={isTrendLoading} />
                <KpiCard taskType="Others" chartData={weeklyTrend.Others} numWeeks={numWeeks} isLoading={isTrendLoading} />
            </div>

            <Divider />
        
            {/* Detailed Trend Comparison Section - Uses isTrendLoading */}
            <Title3 className={styles.sectionTitle}>Detailed Weekly Trend Charts (Last {numWeeks} Weeks)</Title3>
            <div className={styles.chartGrid}>
                <TaskComparisonChartCard 
                    taskType="Provisioning" chartData={weeklyTrend.Provisioning} numWeeks={numWeeks} isLoading={isTrendLoading}
                />
                <TaskComparisonChartCard 
                    taskType="Maintenance" chartData={weeklyTrend.Maintenance} numWeeks={numWeeks} isLoading={isTrendLoading}
                />
                <TaskComparisonChartCard 
                    taskType="Others" chartData={weeklyTrend.Others} numWeeks={numWeeks} isLoading={isTrendLoading}
                />
                <HistoryLineChart data={data} isLoading={isTrendLoading} />
            </div>

            <Divider />

            {/* General Performance and Distribution Section (Date Dependent) - Uses isDateLoading */}
            <Title3 className={styles.sectionTitle}>
                Performance and Distribution **(Date Dependent: {format(currentFilterDate, 'MMM dd, yyyy')})**
            </Title3>
            <div className={styles.chartGrid}>
                {/* 1st row: 2 standard height cards */}
                <HandlerPerformanceChart data={data} selectedDate={currentFilterDate} isLoading={isDateLoading} /> 
                <ZonalTaskVolumeChart data={data} selectedDate={currentFilterDate} isLoading={isDateLoading} /> 
                
                {/* 2nd row: 1 standard card + 1 double height card */}
                <TaskDistributionChart data={data} selectedDate={currentFilterDate} isLoading={isDateLoading} />
                <SpecificRequestTypeDistributionChart 
                    data={data} 
                    selectedDate={currentFilterDate} 
                    isLoading={isDateLoading} 
                    className={styles.doubleHeightCard} 
                /> 
            </div>
        </div>
    );
};