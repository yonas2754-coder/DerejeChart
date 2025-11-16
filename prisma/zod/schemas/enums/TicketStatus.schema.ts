import * as z from 'zod';

export const TicketStatusSchema = z.enum(['Pending', 'In_Progress', 'Resolved'])

export type TicketStatus = z.infer<typeof TicketStatusSchema>;