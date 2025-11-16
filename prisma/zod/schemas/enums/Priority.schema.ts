import * as z from 'zod';

export const PrioritySchema = z.enum(['High', 'Medium', 'Low'])

export type Priority = z.infer<typeof PrioritySchema>;