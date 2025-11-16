// src/app/api/tickets/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "~/prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { TicketStatus } from "@prisma/client";

interface Params {
  id: string;
}

// --- PUT /api/tickets/[id] ---
export async function PUT(
  req: Request,
  context: { params: Params | Promise<Params> }
) {
  // 1️⃣ Unwrap params (App Router requires this)
  const params = await context.params;
  const ticketId = params.id;

  if (!ticketId) {
    return NextResponse.json({ error: "Ticket ID is required" }, { status: 400 });
  }

  console.log(`Received request to update ticket with ID: ${ticketId}`);

  try {
    // 2️⃣ Authenticate user
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const currentUserId = session.user.id;

    // 3️⃣ Parse request body
    const { status, handlerId } = await req.json();

    if (!status && handlerId === undefined) {
      return NextResponse.json(
        { error: "No update fields provided. Requires 'status' or 'handlerId'." },
        { status: 400 }
      );
    }

    // 4️⃣ Fetch existing ticket
    const ticket = await prisma.troubleTicket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    // 5️⃣ Build update data
    const updateData: {
      status?: TicketStatus;
      handlerId?: string | null;
      resolvedAt?: Date | null;
      pending_endAt?: Date | null;
    } = {};

    // --- Status update logic ---
    if (status) {
      if (!Object.values(TicketStatus).includes(status as TicketStatus)) {
        return NextResponse.json(
          { error: `Invalid status. Must be one of: ${Object.values(TicketStatus).join(", ")}` },
          { status: 400 }
        );
      }

      updateData.status = status as TicketStatus;

      // Pending → In_Progress
      if (status === TicketStatus.In_Progress && ticket.status === TicketStatus.Pending) {
        updateData.handlerId = currentUserId;
        updateData.pending_endAt = new Date();
        updateData.resolvedAt = null;
      }

      // Resolving ticket
      if (status === TicketStatus.Resolved) {
        updateData.resolvedAt = new Date();
        if (!ticket.pending_endAt) updateData.pending_endAt = ticket.createdAt;
      }

      // Moving back to Pending
      if (status === TicketStatus.Pending) {
        updateData.resolvedAt = null;
        updateData.pending_endAt = null;
      }
    }

    // --- Explicit handler override ---
    if (handlerId !== undefined) {
      if (!handlerId) {
        // Unassign handler
        updateData.handlerId = null;
      } else {
        // Validate handler exists
        const handlerExists = await prisma.user.findUnique({ where: { id: handlerId } });
        if (!handlerExists) {
          return NextResponse.json({ error: "Handler not found" }, { status: 400 });
        }
        updateData.handlerId = handlerId;
      }
    }

    // 6️⃣ Update ticket in database
    const updatedTicket = await prisma.troubleTicket.update({
      where: { id: ticketId },
      data: updateData,
      include: {
        handler: { select: { id: true, name: true, email: true } },
        createdBy: { select: { id: true, name: true, email: true } },
      },
    });

    // 7️⃣ Return updated ticket
    return NextResponse.json(updatedTicket);
  } catch (err: any) {
    console.error(`Error updating ticket ${ticketId}:`, err);

    if (err.code === "P2025") {
      return NextResponse.json({ error: `Ticket ${ticketId} not found` }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
