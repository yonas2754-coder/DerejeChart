// src/lib/seed.ts
import { PrismaClient, TaskClassification, RequestType, Zone, Priority, TicketStatus, Role } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to get a date in the past
const getDateInPast = (days: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    // Ensure we strip time for consistency if needed, but here we just keep it simple
    return date;
};

export async function seedDatabase() {
    console.log('Starting database seeding...');
    
    try {
        // --- 1. Clean up existing data (Optional but recommended for seeding) ---
        await prisma.troubleTicket.deleteMany();
        await prisma.user.deleteMany();
        console.log('Existing data cleared.');

        // --- 2. Seed Users (Handlers) ---
        const handlerA = await prisma.user.create({
            data: {
                name: 'Alegntaye',
                email: 'alegn@example.com',
                password: 'hashedpasswordA',
                role: Role.supervisor,
            },
        });

        const handlerB = await prisma.user.create({
            data: {
                name: 'Yehualaeshet',
                email: 'yehu@example.com',
                password: 'hashedpasswordB',
                role: Role.user,
            },
        });

        const handlerC = await prisma.user.create({
            data: {
                name: 'Ermias',
                email: 'ermias@example.com',
                password: 'hashedpasswordC',
                role: Role.user,
            },
        });
        
        console.log('Sample users seeded.');

        // --- 3. Seed Trouble Tickets (Sample Historical Data) ---
        const tickets = [
            // Week 1 (Current Week) - Handled by A
            {
                serviceNumber: 'S001', tasksClassification: TaskClassification.Provisioning, priority: Priority.High,
                zone: Zone.CAAZ, handlerId: handlerA.id, createdById: handlerB.id,
                createdAt: getDateInPast(3), remarks: 'Seeding data A', requestType: RequestType.Email,
            },
            // Week 1 - Handled by B
            {
                serviceNumber: 'S002', tasksClassification: TaskClassification.Maintenance, priority: Priority.Medium,
                zone: Zone.WAAZ, handlerId: handlerB.id, createdById: handlerA.id,
                createdAt: getDateInPast(2), remarks: 'Seeding data B', requestType: RequestType.Phone,
            },
            // Week 1 - Resolved
            {
                serviceNumber: 'S003', tasksClassification: TaskClassification.Provisioning, priority: Priority.Low,
                zone: Zone.CAAZ, handlerId: handlerA.id, status: TicketStatus.Resolved, resolvedAt: getDateInPast(1),
                createdAt: getDateInPast(4), remarks: 'Seeding data C', requestType: RequestType.SMS_order,
            },
            // Week 2 (Last Week) - Handled by C
            {
                serviceNumber: 'S004', tasksClassification: TaskClassification.Maintenance, priority: Priority.High,
                zone: Zone.EAAZ, handlerId: handlerC.id,
                createdAt: getDateInPast(10), remarks: 'Seeding historical data', requestType: RequestType.Manual_order,
            },
            // Week 3
            {
                serviceNumber: 'S005', tasksClassification: TaskClassification.Others, priority: Priority.Medium,
                zone: Zone.SAAZ, handlerId: handlerB.id,
                createdAt: getDateInPast(18), remarks: 'Historical Others task', requestType: RequestType.Email,
            },
            // Unhandled ticket
             {
                serviceNumber: 'S006', tasksClassification: TaskClassification.Provisioning, priority: Priority.High,
                zone: Zone.WAAZ, remarks: 'Pending handler assignment', requestType: RequestType.Email,
            }
        ];
        
        // Map the simplified data to the required format and create tickets
        for (const ticket of tickets) {
            await prisma.troubleTicket.create({
                data: {
                    serviceNumber: ticket.serviceNumber,
                    tasksClassification: ticket.tasksClassification,
                    requestType: ticket.requestType,
                    zone: ticket.zone,
                    remarks: ticket.remarks,
                    priority: ticket.priority,
                    status: ticket.status || TicketStatus.Pending,
                    createdAt: ticket.createdAt,
                    updatedAt: ticket.createdAt,
                    // Note: SpecificRequestType is required in your schema, so we pick a default
                    specificRequestType: "GeneralTroubleTicket" as any, 
                    handlerId: ticket.handlerId,
                    createdById: ticket.createdById,
                    resolvedAt: ticket.resolvedAt,
                },
            });
        }

        console.log(`Successfully seeded ${tickets.length} trouble tickets.`);
        
        return { success: true, message: `Database seeded with ${tickets.length} tickets and 3 users.` };

    } catch (error) {
        console.error('DATABASE SEEDING FAILED:', error);
        return { success: false, message: 'Seeding failed. Check server logs.' };
    } finally {
        await prisma.$disconnect();
    }
}