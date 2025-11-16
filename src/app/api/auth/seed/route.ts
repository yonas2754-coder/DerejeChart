import { NextResponse } from 'next/server';
import prisma from '~/prisma/client';
import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

const SALT_ROUNDS = 10;

export async function POST() {
  try {
    // 1. Clear database
    await prisma.user.deleteMany();

    // 2. Base users
    const baseUsers = [
      {
        name: 'Daniel Supervisor',
        email: 'Daniel@example.com',
        password: 'test@123',
        role: Role.supervisor,
      },
      {
        name: 'Dereje Manager',
        email: 'Dereje@example.com',
        password: 'test@123',
        role: Role.manager,
      },
      {
        name: 'system',
        email: 'system@example.com',
        password: 'test@123',
        role: Role.user,
      }
    ];

    // 3. Your user name list
    const nameList = [
      "Semanu",
      "Abdulhafiz",
      "Ermias",
      "Yehualaeshet",
      "Alegntaye",
      "Eden",
      "Halefom"
    ];

    // 4. Convert name list into user objects
    const generatedUsers = nameList.map((name) => ({
      name,
      email: `${name.toLowerCase()}@example.com`,
      password: 'test@123',
      role: Role.user,
    }));

    const rawUsersData = [...baseUsers, ...generatedUsers];

    // 5. Hash passwords
    const usersDataWithHashes = await Promise.all(
      rawUsersData.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, SALT_ROUNDS),
      }))
    );

    // 6. Save to DB
    const result = await prisma.user.createMany({
      data: usersDataWithHashes,
      skipDuplicates: true,
    });

    return NextResponse.json(
      {
        message: 'Database seeded successfully.',
        count: result.count,
        users: rawUsersData.map((u) => u.email),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
