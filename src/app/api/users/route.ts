import { NextResponse } from "next/server";
import prisma from "~/prisma/client";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { role: { in: ["supervisor", "manager"] } },
      select: { id: true, name: true },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
