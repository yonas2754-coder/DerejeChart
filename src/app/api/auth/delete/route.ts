import { NextResponse } from "next/server";
import prisma from "~/prisma/client";

export async function GET() {
  try {
    // Delete all but the latest 100 records
    const deleteResult = await prisma.$executeRaw`
      DELETE FROM "TroubleTicket"
      WHERE "id" NOT IN (
        SELECT "id"
        FROM "TroubleTicket"
        ORDER BY "createdAt" DESC
        LIMIT 100
      );
    `;

    return NextResponse.json(
      {
        message: "Cleanup successful",
        deletedRecords: deleteResult,
        keptRecords: 100,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cleanup Error:", error);
    return NextResponse.json(
      { error: "Cleanup failed, check server logs" },
      { status: 500 }
    );
  }
}
