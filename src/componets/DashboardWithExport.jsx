"use client";

import * as React from "react";

// Fluent UI
import {
  Button,
  Title1,
  Caption1,
  Spinner,
  makeStyles,
  tokens,
  shorthands,
  Card,
} from "@fluentui/react-components";
import { CloudArrowDown24Regular } from "@fluentui/react-icons";

// PPT Generator
import PptxGenJS from "pptxgenjs";

// Charts (Assuming this component exists)
import { DashboardCharts } from "./ChartComponents";

// -----------------------------------------------------------------------------
// BRANDING
// -----------------------------------------------------------------------------
const BRAND = {
  GREEN: "#A5D166",
  DARK_BLUE: "#081F49",
  ACCENT: "#87C045",
  LIGHT_BLUE: "#1E3B6D", // Color for visual depth/metric boxes
};

const getCurrentDateTime = () => {
    // Generates a professional date and time string, e.g., "October 20, 2025, 10:30 AM"
    return new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
      
    });
};

const REPORT = {
  TITLE: "FSASS Section Weekly Performance Report and Daily Activities",
  PERIOD: `Generated on: ${getCurrentDateTime()}`, // FIXED: Using valid Date function
  FOOTER: "FSAS&S Section Performance Report",
};

// --- EXECUTIVE SUMMARY DATA (Cleaned of all artifacts) ---
const EXECUTIVE_SUMMARY_DATA = [
  {
    headline: "Total Provisioning Tasks",
    metric: "483",
    detail: "GPON Combo, Centrex, Short-code, IP PBX provisioning activities completed.",
    fill: BRAND.ACCENT.replace("#", ""),
  },
  {
    headline: "Fixed Voice Support Cases",
    metric: "276",
    detail: "Fixed Voice Advanced support managed, maintaining enterprise service quality.",
    fill: BRAND.LIGHT_BLUE.replace("#", ""),
  },
  {
    headline: "Total Section Activity",
    metric: "759",
    detail: "Combined tasks for provisioning and support, highlighting overall weekly output.",
    fill: BRAND.GREEN.replace("#", ""),
  },
];

// -----------------------------------------------------------------------------
// CHART METADATA
// -----------------------------------------------------------------------------
const CHART_SECTIONS = [
  {
    key: "provisioningTrend",
    title: "1. Provisioning Trend Chart",
    description: "Weekly volume trend for Provisioning tasks.",
    domIndex: 0,
    briefing:
      "Tracks weekly provisioning volume. Used to identify capacity trends, workload distribution, and early signals of demand spikes. This is critical for resource allocation.",
  },
  {
    key: "maintenanceTrend",
    title: "2. Maintenance Trend Chart",
    description: "Weekly volume trend for Maintenance tasks.",
    domIndex: 1,
    briefing:
      "Shows maintenance-related workload over recent weeks. Highlights service stability and recurring system issues. We monitor this to justify proactive maintenance projects.",
  },
  {
    key: "specificRequestDistribution",
    title: "3. Specific Request Type Distribution",
    description: "Distribution of task types handled for the selected date.",
    domIndex: 7,
    briefing:
      "Detailed breakdown of specific request categories. This is crucial for identifying high-demand service types, pinpointing training gaps, and prioritizing automation efforts.",
  },
];

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const useStyles = makeStyles({
  pageWrapper: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.padding(
      tokens.spacingVerticalXXL,
      tokens.spacingHorizontalL
    ),
    minHeight: "100vh",
  },
  headerBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalXL,
  },
  titleGroup: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.margin(tokens.spacingVerticalS, 0),
  },
  reportTitle: {
    color: BRAND.ACCENT,
    fontWeight: tokens.fontWeightSemibold,
  },
  subtitle: {
    color: tokens.colorNeutralForeground2,
  },
  controls: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  dashboardCard: {
    ...shorthands.padding(0, 0),
    boxShadow: tokens.shadow16,
  },
});

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------
async function loadImageAsBase64(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) return null;

    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (_) {
    return null;
  }
}

// -----------------------------------------------------------------------------
// PPT GENERATION LOGIC - PROFESSIONAL LOOK
// -----------------------------------------------------------------------------

/**
 * Adds the Executive Summary slide with 3 visually distinct metric boxes.
 */
const addExecutiveSummarySlide = (ppt, COLOR) => {
  const slide = ppt.addSlide({ masterName: "MASTER" });

  slide.addText("EXECUTIVE SUMMARY", {
    x: 0.5,
    y: 1.0,
    w: 12.3,
    fontSize: 28,
    bold: true,
    color: COLOR.GREEN,
    align: "center",
    fontFace: "Segoe UI",
  });
  
  // Add a clear divider
  slide.addShape(ppt.ShapeType.rect, {
    x: 0.5,
    y: 1.6,
    w: 12.3,
    h: 0.05,
    fill: { color: COLOR.ACCENT },
  });

  // Layout 3 metric boxes horizontally
  const boxWidth = 3.8;
  const boxHeight = 4.0;
  const startX = 0.5;
  const startY = 2.2;
  const gap = 0.4;

  EXECUTIVE_SUMMARY_DATA.forEach((data, index) => {
    const xPos = startX + index * (boxWidth + gap);

    // Background box (Shape)
    slide.addShape(ppt.ShapeType.rect, {
      x: xPos,
      y: startY,
      w: boxWidth,
      h: boxHeight,
      fill: { color: data.fill },
      line: { color: COLOR.WHITE, width: 0.5 },
      shadow: { type: 'outer', blur: 3, offset: 2, angle: 45, color: "000000", opacity: 0.5 }
    });
    
    // Metric Value (Large Font)
    slide.addText(data.metric, {
        x: xPos,
        y: startY + 0.5,
        w: boxWidth,
        h: 1.0,
        align: "center",
        fontSize: 48,
        bold: true,
        color: COLOR.WHITE,
        fontFace: "Segoe UI",
    });

    // Headline (Under Metric)
    slide.addText(data.headline, {
        x: xPos + 0.2, // Small offset
        y: startY + 1.8,
        w: boxWidth - 0.4,
        h: 0.5,
        align: "center",
        fontSize: 16,
        bold: true,
        color: COLOR.WHITE,
        fontFace: "Segoe UI",
    });

    // Detail/Description
    slide.addText(data.detail, {
        x: xPos + 0.2,
        y: startY + 2.5,
        w: boxWidth - 0.4,
        h: 1.0,
        align: "center",
        fontSize: 11,
        color: COLOR.WHITE,
        fontFace: "Segoe UI",
    });
  });
};

/**
 * Generates the PowerPoint file.
 */
const exportPpt = async (images, logo, telebirr) => {
  const ppt = new PptxGenJS();
  ppt.layout = "LAYOUT_WIDE";

  // Use a custom layout based on standard 16:9 for precise positioning
  ppt.defineLayout({ name: 'CUSTOM', width: 13.33, height: 7.5 });

  const COLOR = {
    BACKGROUND: BRAND.DARK_BLUE.replace("#", ""),
    ACCENT: BRAND.ACCENT.replace("#", ""),
    GREEN: BRAND.GREEN.replace("#", ""),
    WHITE: "FFFFFF",
    LIGHT_BLUE: BRAND.LIGHT_BLUE.replace("#", ""),
  };

  // -------------------------------------------------------------------------
  // DEFINE MASTER SLIDE (Clean Header/Footer)
  // -------------------------------------------------------------------------
  const masterObjects = [
    // Header accent bar (Thin line)
    {
      rect: { 
        x: 0, 
        y: 0.1, 
        w: "100%", 
        h: 0.15, 
        fill: { color: COLOR.ACCENT } 
      },
    },
    // Footer background bar
    {
      rect: { 
        x: 0, 
        y: 6.9, 
        w: "100%", 
        h: 0.6, 
        fill: { color: COLOR.ACCENT } 
      },
    },
    // Footer text (Left aligned)
    {
      text: {
        text: REPORT.FOOTER,
        options: {
          x: 0.3,
          y: 7.0,
          w: 6,
          fontSize: 10,
          color: COLOR.WHITE,
          fontFace: "Segoe UI",
        },
      },
    },
    // Page number (Right aligned)
    {
      text: {
        text: "Page <slideNum>",
        options: {
          x: 11.8,
          y: 7.0,
          w: 1.2,
          fontSize: 10,
          color: COLOR.WHITE,
          align: "right",
          fontFace: "Segoe UI",
        },
      },
    },
  ];

  // Add logos
  if (logo) {
    masterObjects.push({
      image: { 
        data: logo, 
        x: 0.3, 
        y: 0.25, 
        w: 1.2, 
        h: 0.35 
      },
    });
  }

  if (telebirr) {
    masterObjects.push({
      image: { 
        data: telebirr, 
        x: 11.8, 
        y: 0.25, 
        w: 1.2, 
        h: 0.35 
      },
    });
  }

  ppt.defineSlideMaster({
    title: "MASTER",
    bkgd: { color: COLOR.BACKGROUND },
    objects: masterObjects,
  });

  // -------------------------------------------------------------------------
  // 1. TITLE SLIDE 
  // -------------------------------------------------------------------------
  const title = ppt.addSlide({ masterName: "MASTER" });

  title.addText(REPORT.TITLE, {
    x: 0.5,
    y: 2.5,
    w: 12.3,
    h: 1.5,
    align: "center",
    fontSize: 32,
    bold: true,
    color: COLOR.WHITE,
    fontFace: "Segoe UI",
  });

  title.addText(REPORT.PERIOD, {
    x: 0.5,
    y: 4.0,
    w: 12.3,
    align: "center",
    fontSize: 20,
    color: COLOR.ACCENT,
    fontFace: "Segoe UI",
  });

  title.addText("REALIZING DIGITAL ETHIOPIAFSASS Section Weekly Performance Report", {
    x: 0.5,
    y: 5.5,
    w: 12.3,
    align: "center",
    fontSize: 16,
    bold: true,
    color: COLOR.GREEN,
    fontFace: "Segoe UI",
  });

  // -------------------------------------------------------------------------
  // 2. EXECUTIVE SUMMARY SLIDE (Metric Boxes)
  // -------------------------------------------------------------------------
  addExecutiveSummarySlide(ppt, COLOR);

  // -------------------------------------------------------------------------
  // 3. CHART SLIDES - PROFESSIONAL LAYOUT (Chart Left, Analysis Right)
  // -------------------------------------------------------------------------
  CHART_SECTIONS.forEach((section) => {
    const img = images[section.key];
    if (!img) return;

    const slide = ppt.addSlide({ masterName: "MASTER" });
    
    // Section title
    slide.addText(section.title, {
      x: 0.5,
      y: 0.6,
      w: 12.3,
      align: "left",
      fontSize: 24,
      bold: true,
      color: COLOR.ACCENT,
      fontFace: "Segoe UI",
    });

    // Chart Position: Left Half
    const CHART_X = 0.5;
    const CHART_Y = 1.5;
    const CHART_W = 7.0;
    const CHART_H = 5.0;
    
    // Text Box Position: Right Half
    const TEXT_X = 7.8;
    const TEXT_Y = 1.5;
    const TEXT_W = 5.0;
    const TEXT_H = 5.0;

    // 1. Add Chart Image
    slide.addImage({
      data: img,
      x: CHART_X,
      y: CHART_Y,
      w: CHART_W,
      h: CHART_H,
    });
    
    // 2. Add Background Shape for Analysis Box (Professional Look)
    slide.addShape(ppt.ShapeType.rect, {
        x: TEXT_X - 0.1, 
        y: TEXT_Y - 0.1, 
        w: TEXT_W + 0.2, 
        h: TEXT_H + 0.2,
        fill: { color: COLOR.LIGHT_BLUE }, // Subtle lighter blue background
        line: { color: COLOR.GREEN, width: 1 }, // Green accent border
    });

    // 3. Description (Headline in the box)
    slide.addText("CHART OVERVIEW", {
      x: TEXT_X,
      y: TEXT_Y + 0.2,
      w: TEXT_W,
      fontSize: 12,
      bold: true,
      color: COLOR.GREEN,
      fontFace: "Segoe UI",
    });

    slide.addText(section.description, {
      x: TEXT_X,
      y: TEXT_Y + 0.6,
      w: TEXT_W,
      fontSize: 14,
      color: COLOR.WHITE,
      fontFace: "Segoe UI",
      wrap: true,
    });

    // 4. Briefing Text (The main analysis)
    slide.addText("KEY ANALYSIS/INSIGHTS:", {
      x: TEXT_X,
      y: TEXT_Y + 1.8,
      w: TEXT_W,
      fontSize: 12,
      bold: true,
      color: COLOR.GREEN,
      fontFace: "Segoe UI",
    });

    slide.addText(section.briefing, {
      x: TEXT_X,
      y: TEXT_Y + 2.2,
      w: TEXT_W,
      h: 2.5,
      fontSize: 11,
      color: COLOR.WHITE,
      valign: "top",
      wrap: true,
      lineSpacing: 12,
      fontFace: "Segoe UI",
    });
  });

  // -------------------------------------------------------------------------
  // 4. END SLIDE (Enhanced)
  // -------------------------------------------------------------------------
  const end = ppt.addSlide({ masterName: "MASTER" });
  end.addText("Thank You!", {
    x: 0.5,
    y: 3.0,
    w: 12.3,
    h: 1.5,
    align: "center",
    fontSize: 48,
    bold: true,
    color: COLOR.GREEN,
    fontFace: "Segoe UI",
  });

  end.addText("For questions or additional information, please contact the FSAS&S Team", {
    x: 0.5,
    y: 4.8,
    w: 12.3,
    align: "center",
    fontSize: 14,
    color: COLOR.WHITE,
    fontFace: "Segoe UI",
  });

  await ppt.writeFile({
    fileName: "FSASS_Weekly_Performance_Report_Professional.pptx",
  });
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------
export const DashboardWithExport = () => {
  const styles = useStyles();
  const containerRef = React.useRef(null);

  const [isGenerating, setIsGenerating] = React.useState(false);
  const [logo, setLogo] = React.useState(null);
  const [telebirr, setTelebirr] = React.useState(null);

  // Load logos once
  React.useEffect(() => {
    loadImageAsBase64("/photoDagm3.png").then(setLogo);
    loadImageAsBase64("/telebirr-logo.png").then(setTelebirr);
  }, []);

  // Extract required Chart.js canvases by index
  const captureChartImages = async () => {
    if (!containerRef.current) return {};

    await new Promise((r) => setTimeout(r, 500));

    const canvases = Array.from(
      containerRef.current.querySelectorAll("canvas")
    );

    const result = {};

    CHART_SECTIONS.forEach((section) => {
      const canvas = canvases[section.domIndex];
      if (canvas && canvas.width && canvas.height) {
        result[section.key] = canvas.toDataURL("image/png");
      }
    });

    return result;
  };

  // ---------------------------------------------------------------------------
  // EXPORT HANDLER
  // ---------------------------------------------------------------------------
  const handleExport = async () => {
    if (!containerRef.current) {
      alert("Charts not ready. Please wait for the dashboard to load completely.");
      return;
    }

    setIsGenerating(true);

    try {
      const images = await captureChartImages();
      
      const hasImages = Object.values(images).some(img => img !== undefined);
      if (!hasImages) {
        alert("No chart images found. Please ensure charts are properly loaded.");
        return;
      }

      await exportPpt(images, logo, telebirr);
    } catch (error) {
      console.error("PPT Generation Error:", error);
      alert("Failed to generate PowerPoint. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className={styles.headerBar}>
        <div className={styles.titleGroup}>
          <Title1 className={styles.reportTitle}>{REPORT.TITLE}</Title1>
          <Caption1 className={styles.subtitle}>{REPORT.PERIOD}</Caption1>
        </div>

        <div className={styles.controls}>
          <Button
            appearance="primary"
            onClick={handleExport}
            disabled={isGenerating}
            icon={
              isGenerating ? <Spinner size="tiny" /> : <CloudArrowDown24Regular />
            }
          >
            {isGenerating ? "Generating Report..." : "Generate Branded PPTX"}
          </Button>
        </div>
      </div>

      {/* Dashboard */}
      <Card className={styles.dashboardCard} ref={containerRef}>
        <DashboardCharts />
      </Card>
    </div>
  );
};

export default DashboardWithExport;