import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TicketStatusSchema } from '../enums/TicketStatus.schema'

const nestedenumticketstatusfilterSchema = z.object({
  equals: TicketStatusSchema.optional(),
  in: TicketStatusSchema.array().optional(),
  notIn: TicketStatusSchema.array().optional(),
  not: z.union([TicketStatusSchema, z.lazy(() => NestedEnumTicketStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumTicketStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumTicketStatusFilter> = nestedenumticketstatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumTicketStatusFilter>;
export const NestedEnumTicketStatusFilterObjectZodSchema = nestedenumticketstatusfilterSchema;
