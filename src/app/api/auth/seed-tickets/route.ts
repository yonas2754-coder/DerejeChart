import { NextResponse } from "next/server";
import prisma from "~/prisma/client";
import {
  TaskClassification,
  RequestType,
  SpecificRequestType,
  Zone,
  Priority,
  TicketStatus,
} from "@prisma/client";

// Number of tickets to generate
const TICKET_COUNT = 50;

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

// Random date between last 60 days and next 7 days
function randomDateLast60DaysToFuture7Days(): Date {
  const now = new Date();

  // 60 days ago
  const past = new Date();
  past.setDate(now.getDate() - 60);

  // 7 days in the future
  const future = new Date();
  future.setDate(now.getDate() + 7);

  // Random timestamp between past → future
  return new Date(
    past.getTime() +
      Math.random() * (future.getTime() - past.getTime())
  );
}

// Random picker for enum values
function pickRandom<T>(values: T[]): T {
  return values[Math.floor(Math.random() * values.length)];
}

// Random Ethiopian 09 phone number
function randomServiceNumber() {
  return `09${Math.floor(10000000 + Math.random() * 90000000)}`;
}

// --------------------------------------------------
// POST: Seed Tickets
// --------------------------------------------------
export async function POST() {
  try {
    // Load all users (must exist)
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      return NextResponse.json(
        { error: "No users found. Seed users first." },
        { status: 400 }
      );
    }

    const tickets: any[] = [];

    for (let i = 0; i < TICKET_COUNT; i++) {
      // NEW: createdAt between last 60 days and future 7 days
      const createdAt = randomDateLast60DaysToFuture7Days();

      // Always assign creators/handlers
      const createdByUser = pickRandom(users);
      const handlerUser = pickRandom(users);

      // Decide ticket status
      const statusChance = Math.random();
      let status: TicketStatus = TicketStatus.Pending;
      let resolvedAt: Date | null = null;

      if (statusChance < 0.30) {
        status = TicketStatus.Resolved;

        // resolvedAt always AFTER createdAt
        resolvedAt = new Date(
          createdAt.getTime() +
            Math.random() * (5 * 24 * 60 * 60 * 1000)
        );
      } else if (statusChance < 0.60) {
        status = TicketStatus.In_Progress;
      }

      tickets.push({
        serviceNumber: randomServiceNumber(),

        tasksClassification: pickRandom(Object.values(TaskClassification)),
        requestType: pickRandom(Object.values(RequestType)),
        specificRequestType: pickRandom(Object.values(SpecificRequestType)),
        zone: pickRandom(Object.values(Zone)),
        remarks: "Auto-generated test ticket",
        priority: pickRandom(Object.values(Priority)),

        status,

        // pending_endAt only if pending
        pending_endAt:
          status === TicketStatus.Pending
            ? new Date(
                createdAt.getTime() +
                  Math.random() * (10 * 24 * 60 * 60 * 1000)
              )
            : null,

        resolvedAt,
        createdAt,
        updatedAt: new Date(),

        createdById: createdByUser.id,
        handlerId: handlerUser.id, // always has handler
      });
    }

    const result = await prisma.troubleTicket.createMany({
      data: tickets,
      skipDuplicates: true,
    });

    return NextResponse.json(
      {
        message: "Ticket seeding complete",
        total: result.count,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ticket Seed Error:", error);
    return NextResponse.json(
      { error: "Seeding error, check server logs" },
      { status: 500 }
    );
  }
}
