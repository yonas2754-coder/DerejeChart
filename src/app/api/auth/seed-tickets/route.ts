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

// ----------------------------------------------
// RANDOM HELPERS
// ----------------------------------------------

// Random date within last 60 days
function randomDateLast60Days(): Date {
  const now = new Date();
  const past = new Date();
  past.setDate(now.getDate() - 60);

  return new Date(
    past.getTime() + Math.random() * (now.getTime() - past.getTime())
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

export async function POST() {
  try {
    // Load all users (seed users must exist)
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      return NextResponse.json(
        { error: "No users found. Seed users first." },
        { status: 400 }
      );
    }

    const tickets: any[] = [];

    for (let i = 0; i < TICKET_COUNT; i++) {
      // Always generate a createdAt within last 60 days
      const createdAt = randomDateLast60Days();

      // Always assign a createdBy user
      const createdByUser = pickRandom(users);

      // Always assign a handler (100%)
      const handlerUser = pickRandom(users);

      // Random status logic
      const statusChance = Math.random();
      let status: TicketStatus = TicketStatus.Pending;
      let resolvedAt: Date | null = null;

      if (statusChance < 0.30) {
        status = TicketStatus.Resolved;
        resolvedAt = new Date(
          createdAt.getTime() + Math.random() * (5 * 24 * 60 * 60 * 1000)
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
        handlerId: handlerUser.id, // ALWAYS has a handler
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
