import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  serviceNumber: z.literal(true).optional(),
  tasksClassification: z.literal(true).optional(),
  requestType: z.literal(true).optional(),
  specificRequestType: z.literal(true).optional(),
  zone: z.literal(true).optional(),
  remarks: z.literal(true).optional(),
  priority: z.literal(true).optional(),
  status: z.literal(true).optional(),
  pending_endAt: z.literal(true).optional(),
  resolvedAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  createdById: z.literal(true).optional(),
  handlerId: z.literal(true).optional()
}).strict();
export const TroubleTicketMinAggregateInputObjectSchema: z.ZodType<Prisma.TroubleTicketMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketMinAggregateInputType>;
export const TroubleTicketMinAggregateInputObjectZodSchema = makeSchema();
