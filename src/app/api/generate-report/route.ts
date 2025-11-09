// app/api/generate-report/route.ts
import { HANDLER_PERFORMANCE, TASK_COUNTS } from '@/data/data';
import { NextRequest, NextResponse } from 'next/server';
import PptxGenJS from 'pptxgenjs';

// ⚠️ IMPORTANT: Update this import path based on your project structure


// --- Configuration ---
const REPORT_TITLE = "FiXed SERVICES ADVANCED SUPPORT AND SOLUTION Section weekly performance report";
const REPORT_PERIOD = "From Oct 27 - Nov 2, 2025 (Week 43)";
const CURRENT_DATE = new Date().toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
const FOOTER_TEXT = `week 43 performance Report | FSAS&S Section`;
// Enterprise Brand Color (Fluent UI Blue)
const BRAND_COLOR = "0078D4"; 

// --- Helper Functions ---

/** Converts application data to a PptxGenJS Table Data format */
function getHandlerTableData() {
    const header = [
        { text: "Handler", options: { fill: BRAND_COLOR, color: "FFFFFF", align: 'left' } },
        { text: "Total Tasks Handled", options: { fill: BRAND_COLOR, color: "FFFFFF", align: 'left' } },
    ];
    
    // Sort by tasks handled
    const sortedData = [...HANDLER_PERFORMANCE].sort((a, b) => b.totalTasks - a.totalTasks);

    const rows = sortedData.map(d => [
        { text: d.handler }, 
        { text: d.totalTasks.toString() }
    ]);
    
    return [header, ...rows];
}

/**
 * Main report generation logic using pptxgenjs.
 */
async function generateReportPptx(): Promise<PptxGenJS> {
    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_WIDE';
    
    // ----------------------------------------------------
    // Master Slide Definition (Ensures Branded Footer and Date)
    // ----------------------------------------------------
    pptx.defineSlideMaster({
        title: "ETHIO_MASTER",
        bkgd: "FFFFFF",
        objects: [
            // Prominent Footer Bar (Full width, matching the uploaded file's look)
            { rect: { x: 0, y: "90%", w: "100%", h: "10%", fill: { color: BRAND_COLOR } } },
            // Footer Date
            { text: { text: CURRENT_DATE, options: { x: 0.5, y: "92%", color: "FFFFFF", fontSize: 10 } } },
            // Footer Text
            { text: { text: FOOTER_TEXT, options: { x: 2.5, y: "92%", color: "FFFFFF", fontSize: 10 } } },
        ]
    });

    // ----------------------------------------------------
    // Slide 1: Title Slide (High Impact)
    // ----------------------------------------------------
    const slide1 = pptx.addSlide({ masterName: "ETHIO_MASTER" });
    slide1.addText(
        REPORT_TITLE,
        { 
            x: 0.5, 
            y: 2.0, // Vertically centered position for impact
            w: '90%', 
            fontSize: 32, 
            color: BRAND_COLOR, 
            bold: true,
            align: 'center' 
        }
    );
    slide1.addText(
        REPORT_PERIOD,
        { 
            x: 0.5, 
            y: 3.5, 
            w: '90%', 
            fontSize: 20, 
            color: "666666",
            align: 'center' 
        }
    );

    // ----------------------------------------------------
    // Slide 2: EXECUTIVE SUMMARY
    // ----------------------------------------------------
    const slide2 = pptx.addSlide({ masterName: "ETHIO_MASTER" });
    slide2.addText("EXECUTIVE SUMMARY", { x: 0.5, y: 0.5, w: '90%', fontSize: 24, bold: true });
    
    const summaryList = [
        `Provisioning (GPON Combo, Centrex, Short-code, IP PBX) completed: ${TASK_COUNTS.Provisioning}`,
        `Fixed Voice Advanced support managed: ${TASK_COUNTS.Maintenance}`,
        `Total tasks handled this week: ${TASK_COUNTS.Provisioning + TASK_COUNTS.Maintenance + TASK_COUNTS.Others}`,
        `Top Handler: ${HANDLER_PERFORMANCE[0].handler} (${HANDLER_PERFORMANCE[0].totalTasks} tasks)`,
    ];
    
    slide2.addText(summaryList.join('\n'), {
        x: 0.5, y: 1.5, w: '90%', fontSize: 18, bullet: { type: "number" }
    });

    // ----------------------------------------------------
    // Slide 3: ADVANCED PROVISIONING AND MAINTENANCE SUPPORT PERFORMANCE (Charts)
    // ----------------------------------------------------
    const slide3 = pptx.addSlide({ masterName: "ETHIO_MASTER" });
    slide3.addText("ADVANCED PROVISIONING AND MAINTENANCE SUPPORT PERFORMANCE", { x: 0.5, y: 0.5, w: '90%', fontSize: 24, bold: true });

    // Placeholders for your dashboard charts (4.5in x 2.8in each)
    const chartOptions = { x: 0.5, y: 1.5, cx: 4.5, cy: 2.8, fill: { color: "F0F0F0" }, border: { pt: 1, color: "AAAAAA" } };

    // Draw placeholder rectangles and add text overlays
    slide3.addShape('rect', { ...chartOptions, x: 0.5, y: 1.5 });
    slide3.addText("Chart 1: Historical Daily Task Volume (Line Chart)", { x: 0.6, y: 1.6, w: 4.3, h: 2.6, align: 'center', valign: 'middle', fontSize: 12 });

    slide3.addShape('rect', { ...chartOptions, x: 5.0, y: 1.5 });
    slide3.addText("Chart 2: Handler Performance (Bar Chart)", { x: 5.1, y: 1.6, w: 4.3, h: 2.6, align: 'center', valign: 'middle', fontSize: 12 });

    slide3.addShape('rect', { ...chartOptions, x: 0.5, y: 4.5 });
    slide3.addText("Chart 3: Task Classification (Doughnut Chart)", { x: 0.6, y: 4.6, w: 4.3, h: 2.6, align: 'center', valign: 'middle', fontSize: 12 });

    slide3.addShape('rect', { ...chartOptions, x: 5.0, y: 4.5 });
    slide3.addText("Chart 4: Zonal Task Volume (Stacked Bar Chart)", { x: 5.1, y: 4.6, w: 4.3, h: 2.6, align: 'center', valign: 'middle', fontSize: 12 });


    // ----------------------------------------------------
    // Slide 4: PROVISIONING AND ADVANCED SUPPORT DETAIL (Table)
    // ----------------------------------------------------
    const slide4 = pptx.addSlide({ masterName: "ETHIO_MASTER" });
    slide4.addText("PROVISIONING AND ADVANCED SUPPORT DETAIL: Handler Breakdown", { x: 0.5, y: 0.5, w: '90%', fontSize: 24, bold: true });
    
    slide4.addTable(getHandlerTableData(), { 
        x: 0.5, 
        y: 1.5, 
        w: 9.0, 
        rowH: 0.3,
        autoPage: true,
        // Match table header color to BRAND_COLOR defined above
        border: { pt: 1, color: "E0E0E0" },
        align: 'left',
        valign: 'middle',
    });


    return pptx;
}


// --- App Router Handler (GET method) ---
export async function GET(request: NextRequest) {
    try {
        const pptx = await generateReportPptx();
        
        // Get the file buffer
        const buffer = await pptx.write({ outputType: 'nodebuffer' }) as Buffer;

        // Return a standard Web Response with the buffer and download headers
                const uint8Array = new Uint8Array(buffer);
                return new Response(uint8Array, {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                        'Content-Disposition': 'attachment; filename="FSASS_Weekly_Report.pptx"',
                        'Content-Length': buffer.length.toString(),
                    },
                });

    } catch (error) {
        console.error("PPTX Generation Error:", error);
        return NextResponse.json(
            { message: 'Error generating presentation', error: error instanceof Error ? error.message : 'Unknown error' }, 
            { status: 500 }
        );
    }
}