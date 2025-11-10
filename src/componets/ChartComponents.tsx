// src/components/ChartComponents.tsx
"use client";

import * as React from "react";
import { 
  Card, CardHeader, CardPreview, Title3, 
  makeStyles, shorthands, tokens,
  Button, useId
} from "@fluentui/react-components";
import { Bar, Doughnut, Line } from "react-chartjs-2"; 
import { 
  Chart as ChartJS, CategoryScale, LinearScale, 
  BarElement, Title, Tooltip, Legend, ArcElement, 
  PointElement, LineElement, Chart
} from "chart.js";

// Import Download icon
import { ArrowDownloadRegular } from "@fluentui/react-icons";

import { DateRangePicker, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { CalendarMonthRegular } from "@fluentui/react-icons";

import { 
  getHandlerPerformanceData, 
  getTaskDistributionData, 
  getZonalTaskData, 
  getTaskHistoryData 
} from "../data/data";

// =======================================================
// Chart.js Setup
// =======================================================
ChartJS.register(
  CategoryScale, LinearScale, BarElement, 
  Title, Tooltip, Legend, ArcElement,
  PointElement, LineElement
);

// =======================================================
// Styles
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
    height: "450px",
    display: "flex",
    flexDirection: "column",
  },
  cardPreview: {
    flexGrow: 1,
  },
  chartContainer: {
    height: "100%",
    width: "100%",
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
  
  // New style to right-align the download button in the header
  cardHeaderWithAction: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  // ✅ Overlay to darken background
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(8px)",
    zIndex: 1000,
  },

  // ✅ Responsive centered popup
  centeredPopup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1100,
    boxShadow: tokens.shadow28,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    ...shorthands.padding("12px"),
    maxWidth: "95vw",
    maxHeight: "95vh",
    overflow: "auto",
    
    // Mobile styles
    "@media (max-width: 768px)": {
      width: "95vw",
      height: "auto",
      ...shorthands.padding("8px"),
      transform: "translate(-50%, -50%)",
    },
    
    // Small mobile styles
    "@media (max-width: 480px)": {
      width: "98vw",
      maxHeight: "90vh",
      ...shorthands.padding("4px"),
    },
  },

  // ✅ Responsive calendar container
  calendarContainer: {
    width: "100%",
    height: "100%",
    
    "@media (max-width: 768px)": {
      "& .rdrDateRangePickerWrapper": {
        flexDirection: "column",
      },
      
      "& .rdrCalendarWrapper": {
        flex: "1 1 auto",
        minWidth: "unset",
      },
      
      "& .rdrMonthAndYearWrapper": {
        padding: "8px 4px",
      },
      
      "& .rdrMonth": {
        width: "100%",
      },
      
      "& .rdrWeekDays": {
        ...shorthands.padding("0", "4px"),
      },
      
      "& .rdrDays": {
        ...shorthands.padding("0", "4px"),
      },
      
      "& .rdrDay": {
        height: "36px",
        fontSize: "12px",
      },
      
      "& .rdrDayNumber": {
        fontSize: "12px",
      },
      
      "& .rdrMonthName": {
        fontSize: "14px",
      },
    },
    
    "@media (max-width: 480px)": {
      "& .rdrMonthAndYearWrapper": {
        padding: "6px 2px",
      },
      
      "& .rdrDay": {
        height: "32px",
        fontSize: "11px",
      },
      
      "& .rdrDayNumber": {
        fontSize: "11px",
        top: "0px",
      },
      
      "& .rdrMonthName": {
        fontSize: "12px",
      },
      
      "& .rdrNextPrevButton": {
        width: "24px",
        height: "24px",
      },
    },
  },

  cleanCalendar: {
    "& .rdrCalendarWrapper": {
      border: "none",
      fontFamily: tokens.fontFamilyBase,
    },
    
    // Single month layout for mobile
    "@media (max-width: 768px)": {
      "& .rdrDateRangePickerWrapper": {
        flexDirection: "column",
      },
      
      "& .rdrMonths": {
        flexDirection: "column",
      },
      
      "& .rdrMonth": {
        width: "100% !important",
      },
    },
  },

  // ✅ Apply button container
  applyButtonContainer: {
    textAlign: "right",
    marginTop: "10px",
    
    "@media (max-width: 480px)": {
      marginTop: "8px",
    },
  },

  // ✅ Close button for mobile
  closeButton: {
    "@media (max-width: 768px)": {
      width: "100%",
      marginTop: "8px",
    },
  },
});

// =======================================================
// Helper function to handle the download logic
// =======================================================

/**
 * Handles the download of the chart as a PNG image.
 * @param chartRef The React ref object pointing to the Chart component instance.
 * @param fileName The desired file name for the downloaded image.
 */
const downloadChartImage = (chartRef: React.RefObject<Chart | null>, fileName: string) => {
    const chart = chartRef.current;
    if (chart) {
        // Get the image data URL
        const image = chart.toBase64Image("image/png", 1);
        
        // Create a temporary anchor element
        const a = document.createElement('a');
        a.href = image;
        a.download = fileName + '.png';
        
        // Trigger the download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        console.error("Chart instance not found.");
    }
};

// =======================================================
// Chart Wrapper
// =======================================================
const ChartWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const styles = useStyles();
  return (
    <CardPreview className={styles.cardPreview}>
      <div className={styles.chartContainer}>{children}</div>
    </CardPreview>
  );
};

// =======================================================
// Charts (with Download Buttons)
// =======================================================

const HandlerPerformanceChart: React.FC = () => {
    const styles = useStyles();
    const chartRef = React.useRef<Chart<"bar">>(null);
    const chartTitle = "Handler Performance: Total Tasks";

    const handleDownload = () => {
        downloadChartImage(chartRef, 'Handler_Performance_Chart');
    };

    return (
        <Card className={styles.chartCard}>
            <CardHeader 
                header={
                    <div className={styles.cardHeaderWithAction}>
                        <Title3>{chartTitle}</Title3>
                        <Button 
                            appearance="subtle"
                            icon={<ArrowDownloadRegular />}
                            onClick={handleDownload}
                            aria-label="Download Handler Performance Chart"
                            size="small"
                        />
                    </div>
                } 
            />
            <ChartWrapper>
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
        </Card>
    );
};

const TaskDistributionChart = () => {
  const styles = useStyles();
  const chartRef = React.useRef<Chart<"doughnut">>(null);
  const chartTitle = "Task Classification Distribution";

  const handleDownload = () => {
      downloadChartImage(chartRef, 'Task_Distribution_Chart');
  };

  return (
    <Card className={styles.chartCard}>
      <CardHeader 
        header={
          <div className={styles.cardHeaderWithAction}>
              <Title3>{chartTitle}</Title3>
              <Button 
                  appearance="subtle"
                  icon={<ArrowDownloadRegular />}
                  onClick={handleDownload}
                  aria-label="Download Task Distribution Chart"
                  size="small"
              />
          </div>
        } 
      />
      <ChartWrapper>
        <Doughnut 
            ref={chartRef}
            data={getTaskDistributionData()} 
            options={{ responsive: true, maintainAspectRatio: false }} 
        />
      </ChartWrapper>
    </Card>
  );
};

const ZonalTaskVolumeChart = () => {
  const styles = useStyles();
  const chartRef = React.useRef<Chart<"bar">>(null);
  const chartTitle = "Task Volume by Zone/Region";

  const handleDownload = () => {
      downloadChartImage(chartRef, 'Zonal_Task_Volume_Chart');
  };

  return (
    <Card className={styles.chartCard}>
      <CardHeader 
        header={
          <div className={styles.cardHeaderWithAction}>
              <Title3>{chartTitle}</Title3>
              <Button 
                  appearance="subtle"
                  icon={<ArrowDownloadRegular />}
                  onClick={handleDownload}
                  aria-label="Download Zonal Task Volume Chart"
                  size="small"
              />
          </div>
        } 
      />
      <ChartWrapper>
        <Bar 
            ref={chartRef}
            data={getZonalTaskData()} 
            options={{ responsive: true, maintainAspectRatio: false }} 
        />
      </ChartWrapper>
    </Card>
  );
};

const HistoryLineChart: React.FC = () => {
    const styles = useStyles();
    const chartRef = React.useRef<Chart<"line">>(null);
    const chartTitle = "Historical Daily Task Volume";
    
    const handleDownload = () => {
        downloadChartImage(chartRef, 'Historical_Daily_Task_Volume_Chart');
    };

    return (
        <Card className={styles.chartCard}>
            <CardHeader 
                header={
                    <div className={styles.cardHeaderWithAction}>
                        <Title3>{chartTitle}</Title3>
                        <Button 
                            appearance="subtle"
                            icon={<ArrowDownloadRegular />}
                            onClick={handleDownload}
                            aria-label="Download Historical Daily Task Volume Chart"
                            size="small"
                        />
                    </div>
                } 
            />
            <ChartWrapper>
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
        </Card>
    );
};

// =======================================================
// Main Component
// =======================================================

export const DashboardCharts: React.FC = () => {
  const styles = useStyles();
  const buttonId = useId("date-range-button");

  const [isOpen, setIsOpen] = React.useState(false);
  const [range, setRange] = React.useState<Range[]>([
    { startDate: new Date(new Date().setDate(new Date().getDate() - 7)), endDate: new Date(), key: "selection" },
  ]);

  const handleRangeChange = (ranges: { [key: string]: Range }) => {
    setRange([ranges.selection]);
  };

  const formattedDateRange = `${format(range[0].startDate!, "MMM dd, yyyy")} - ${format(
    range[0].endDate!,
    "MMM dd, yyyy"
  )}`;

  // Disable scroll when popup open
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close popup when clicking escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  return (
    <div style={{ padding: "0px" }}>
      {/* ✅ Date Range Button */}
      <div className={styles.dateRangeContainer}>
        <Button
          id={buttonId}
          appearance="subtle"
          icon={<CalendarMonthRegular />}
          className={styles.dateButton}
          onClick={() => setIsOpen(true)}
        >
          Date Range: {formattedDateRange}
        </Button>
      </div>

      {/* ✅ Responsive Popup */}
      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />
          <div className={`${styles.centeredPopup} ${styles.cleanCalendar}`}>
            <div className={styles.calendarContainer}>
              <DateRangePicker
                ranges={range}
                onChange={handleRangeChange}
                moveRangeOnFirstSelection={false}
                months={2}
                direction="horizontal"
                showSelectionPreview
                rangeColors={[tokens.colorBrandBackground]}
                // Responsive props
                monthDisplayFormat="MMMM yyyy"
                weekdayDisplayFormat="EEEEEE" // Short weekday names
              />
            </div>
            <div className={styles.applyButtonContainer}>
              <Button 
                appearance="primary" 
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
              >
                Apply
              </Button>
            </div>
          </div>
        </>
      )}

      {/* ✅ Charts Grid */}
      <div className={styles.chartGrid}>
        <HistoryLineChart />
        <HandlerPerformanceChart />
        <TaskDistributionChart />
        <ZonalTaskVolumeChart />
      </div>
    </div>
  );
};