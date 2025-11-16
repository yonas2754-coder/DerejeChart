import { NextResponse } from "next/server";
import prisma from "~/prisma/client";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    const handlerList = users.filter(u => u.name).map(u => ({ id: u.id, name: u.name! }));

    return NextResponse.json(handlerList);
  } catch (error) {
    console.error("Error fetching handlers:", error);
    return NextResponse.json({ error: "Failed to fetch handlers" }, { status: 500 });
  }
}
