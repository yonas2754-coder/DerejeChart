import { NextResponse } from "next/server";
import prisma from "~/prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// --- Utility: Time Calculation Helpers ---

/**
 * Converts milliseconds to an HH:MM string format.
 */
function msToHhMm(diffMs: number): string {
    if (diffMs <= 0 || isNaN(diffMs)) return "00:00"; 

    const totalSeconds = Math.floor(diffMs / 1000); 
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

/**
 * Calculates the duration a ticket spent in the 'Pending' status (in milliseconds).
 * This logic handles: 1) Completed Pending phase, 2) Active Pending phase.
 */
function calculatePendingDuration(ticket: any): number {
    const startMs = new Date(ticket.createdAt).getTime();
    
    // 1. Pending phase is COMPLETE (it moved to In_Progress or was resolved immediately)
    if (ticket.pending_endAt) {
        const endMs = new Date(ticket.pending_endAt).getTime();
        return Math.max(0, endMs - startMs);
    } 
    
    // 2. Pending phase is ACTIVE
    // Only applies if the current status IS Pending.
    if (ticket.status === "Pending") {
        return Math.max(0, Date.now() - startMs);
    }
    
    // 3. For Resolved tickets that somehow missed pending_endAt or In_Progress tickets 
    // where pending_endAt is null, the duration is 0 based on the database fields.
    return 0;
}

/**
 * Calculates the duration a ticket spent in the 'In-Progress' status (in milliseconds).
 * This logic handles: 1) Completed In-Progress phase, 2) Active In-Progress phase.
 */
function calculateInProgressDuration(ticket: any): number {
    // In-Progress phase cannot start without a pending_endAt timestamp.
    if (!ticket.pending_endAt) {
        return 0;
    }

    const startMs = new Date(ticket.pending_endAt).getTime();
    
    // 1. In-Progress phase is COMPLETE (it is resolved)
    if (ticket.resolvedAt) {
        const endMs = new Date(ticket.resolvedAt).getTime();
        return Math.max(0, endMs - startMs);
    }
    
    // 2. In-Progress phase is ACTIVE
    if (ticket.status === "In_Progress") {
        return Math.max(0, Date.now() - startMs);
    }
    
    // 3. If status is Pending or Resolved (but missing resolvedAt), the duration is 0.
    return 0;
}


// --- POST /api/tickets: Create a new Trouble Ticket ---
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const createdById = session.user.id;

        const data = await req.json();
        const {
            serviceNumber, tasksClassification, requestType, specificRequestType,
            zone, remarks, priority, handlerId,
        } = data;

        if (
            !serviceNumber || !tasksClassification || !requestType || 
            !specificRequestType || !zone || !priority
        ) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // 💡 Improvement: Ensure serviceNumber is unique or handle collision if needed
        // await prisma.troubleTicket.findUnique({ where: { serviceNumber } }); 

        const ticket = await prisma.troubleTicket.create({
            data: {
                serviceNumber, tasksClassification, requestType, 
                specificRequestType, zone, priority,
                remarks: remarks || "", 
                handler: handlerId ? { connect: { id: handlerId } } : undefined,
                createdBy: { connect: { id: createdById } },
                // Status defaults to "Pending" based on your schema
            },
        });

        return NextResponse.json(ticket, { status: 201 });
    } catch (err: any) {
        // Handle Foreign Key Constraint (P2003) for invalid handlerId
        if (err.code === 'P2003') {
             return NextResponse.json({ error: "Handler ID is invalid or does not exist." }, { status: 400 });
        }
        // Handle Unique Constraint (P2002) if serviceNumber must be unique
        if (err.code === 'P2002') {
             return NextResponse.json({ error: "A ticket with this Service Number already exists." }, { status: 409 });
        }
        
        console.error("❌ Error creating ticket:", err);
        return NextResponse.json(
            { error: "Failed to create ticket" },
            { status: 500 }
        );
    }
}

// --------------------------------------------------------------------
// --- GET /api/tickets: Fetch all Trouble Tickets ---
// --------------------------------------------------------------------
export async function GET() {
    try {
        // Fetch all tickets, including the handler's name for display
        const tickets = await prisma.troubleTicket.findMany({
            // FIX: Ensure all relation fields are included
            include: {
                handler: { select: { name: true } }, 
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        console.log("Fetched tickets:", tickets);

        const formattedTickets = tickets.map((t) => {
            // Map Prisma status to the desired frontend display status
            let statusDisplay: "Pending" | "In-Progress" | "Resolved";
            if (t.status === "In_Progress") {
                statusDisplay = "In-Progress";
            } else if (t.status === "Resolved") { 
                statusDisplay = "Resolved";
            } else { 
                statusDisplay = "Pending";
            }

            // Calculate component durations in milliseconds
            const pendingMs = calculatePendingDuration(t);
            const inProgressMs = calculateInProgressDuration(t);
            const totalMs = pendingMs + inProgressMs; // Sum of active/completed phases

            return {
                id: t.id,
                serviceNumber: t.serviceNumber,
                tasksClassification: t.tasksClassification,
                requestType: t.requestType,
                specificRequestType: t.specificRequestType,
                priority: t.priority,
                
                // Format zone name if needed (e.g., "EAAZ_East" -> "EAAZ East")
                zone: t.zone.replaceAll("_", " "), 
                // Default to "Unassigned" if handler or name is null
                handler: t.handler?.name || "Unassigned", 
                status: statusDisplay,
                
                // Dates as ISO strings (Next.js automatically handles Date serialization)
                createdAt: t.createdAt,
                resolvedAt: t.resolvedAt,
                pending_endAt: t.pending_endAt,
                
                // Total duration (HH:MM) for display
                duration: msToHhMm(totalMs),
                
                // Duration components in milliseconds for client-side use/sorting
                pendingDurationMs: pendingMs,
                inProgressDurationMs: inProgressMs,
            };
        });
console.log("Formatted tickets:", formattedTickets);
        return NextResponse.json(formattedTickets);
    } catch (error) {
        console.error("❌ Error fetching TroubleTickets:", error);
        return NextResponse.json(
            { error: "Failed to load tickets" },
            { status: 500 }
        );
    }
}