import * as z from 'zod';

export const RequestTypeSchema = z.enum(['Email', 'Phone', 'SMS_order', 'TT', 'Manual_order'])

export type RequestType = z.infer<typeof RequestTypeSchema>;