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

const TICKET_COUNT = 50;

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

// Strict random date generator between 2 dates
function randomDateBetween(min: Date, max: Date): Date {
  return new Date(min.getTime() + Math.random() * (max.getTime() - min.getTime()));
}

// Random createdAt between last 60 days → next 7 days
function randomCreatedAt() {
  const now = new Date();

  const past = new Date(now);
  past.setDate(now.getDate() - 60);

  const future = new Date(now);
  future.setDate(now.getDate() + 7);

  return randomDateBetween(past, future);
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomServiceNumber() {
  return `09${Math.floor(10000000 + Math.random() * 90000000)}`;
}

// --------------------------------------------------
// POST: Seed Tickets
// --------------------------------------------------
export async function POST() {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
      return NextResponse.json(
        { error: "No users found. Seed users first." },
        { status: 400 }
      );
    }

    const tickets: any[] = [];

    for (let i = 0; i < TICKET_COUNT; i++) {
      const createdAt = randomCreatedAt();

      const createdByUser = pickRandom(users);
      const handlerUser = pickRandom(users);

      // Random status
      const randomStatus = Math.random();
      let status: TicketStatus = TicketStatus.Pending;
      let resolvedAt: Date | null = null;
      let pending_endAt: Date | null = null;

      if (randomStatus < 0.3) {
        // 30% resolved
        status = TicketStatus.Resolved;

        // resolvedAt AFTER createdAt (1–5 days)
        resolvedAt = randomDateBetween(
          createdAt,
          new Date(createdAt.getTime() + 5 * 24 * 60 * 60 * 1000)
        );
      } else if (randomStatus < 0.6) {
        // 30% in progress
        status = TicketStatus.In_Progress;
      } else {
        // 40% pending
        status = TicketStatus.Pending;

        // pending_endAt AFTER createdAt (1–10 days)
        pending_endAt = randomDateBetween(
          createdAt,
          new Date(createdAt.getTime() + 10 * 24 * 60 * 60 * 1000)
        );
      }

      tickets.push({
        serviceNumber: randomServiceNumber(),
        tasksClassification: pickRandom(Object.values(TaskClassification)),
        requestType: pickRandom(Object.values(RequestType)),
        specificRequestType: pickRandom(Object.values(SpecificRequestType)),
        zone: pickRandom(Object.values(Zone)),
        priority: pickRandom(Object.values(Priority)),
        remarks: "Auto-generated test ticket",

        status,
        pending_endAt,
        resolvedAt,

        createdAt,
        updatedAt: new Date(),

        createdById: createdByUser.id,
        handlerId: handlerUser.id,
      });
    }

    const result = await prisma.troubleTicket.createMany({
      data: tickets,
      skipDuplicates: true,
    });

    return NextResponse.json(
      { message: "Ticket seeding complete", total: result.count },
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
