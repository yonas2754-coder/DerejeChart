import { NextResponse } from "next/server";
import prisma from "~/prisma/client";
import {
  TaskClassification,
  RequestType,
  SpecificRequestType,
  Zone,
  Priority,
  TicketStatus,
  User,
} from "@prisma/client";

const TICKET_COUNT = 200;

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

/**
 * Returns a random Date between two provided dates.
 */
const randomDateBetween = (min: Date, max: Date): Date =>
  new Date(min.getTime() + Math.random() * (max.getTime() - min.getTime()));

/**
 * random createdAt: -60 days to +7 days
 */
function randomCreatedAt(): Date {
  const now = new Date();

  const min = new Date(now);
  min.setDate(now.getDate() - 60);

  const max = new Date(now);
  max.setDate(now.getDate() + 7);

  return randomDateBetween(min, max);
}

/**
 * Picks a random item from an array.
 */
const pickRandom = <T,>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

/**
 * Random Ethio telecom service number (09xxxxxxxx)
 */
const randomServiceNumber = (): string =>
  `09${Math.floor(10000000 + Math.random() * 90000000)}`;

// --------------------------------------------------
// POST: Seed Tickets
// --------------------------------------------------

export async function POST() {
  try {
    const users: User[] = await prisma.user.findMany();

    if (!users.length) {
      return NextResponse.json(
        { error: "No users found. Please seed users first." },
        { status: 400 }
      );
    }

    const tickets = Array.from({ length: TICKET_COUNT }).map(() => {
      const createdAt = randomCreatedAt();

      const createdByUser = pickRandom(users);
      const handlerUser = pickRandom(users);

      // Random ticket status
      const r = Math.random();

      let status: TicketStatus = TicketStatus.Pending;
      let resolvedAt: Date | null = null;
      let pending_endAt: Date | null = null;

      if (r < 0.3) {
        // Resolved
        status = TicketStatus.Resolved;

        resolvedAt = randomDateBetween(
          createdAt,
          new Date(createdAt.getTime() + 5 * 24 * 60 * 60 * 1000)
        );
      } else if (r < 0.6) {
        // In progress
        status = TicketStatus.In_Progress;
      } else {
        // Pending
        status = TicketStatus.Pending;

        pending_endAt = randomDateBetween(
          createdAt,
          new Date(createdAt.getTime() + 10 * 24 * 60 * 60 * 1000)
        );
      }

      return {
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
      };
    });

    const result = await prisma.troubleTicket.createMany({
      data: tickets,
      skipDuplicates: true,
    });

    return NextResponse.json(
      {
        message: "Ticket seeding complete.",
        total: result.count,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ticket Seed Error:", error);

    return NextResponse.json(
      { error: "Seeding error, check server logs." },
      { status: 500 }
    );
  }
}
