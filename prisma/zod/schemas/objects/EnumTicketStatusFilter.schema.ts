import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TicketStatusSchema } from '../enums/TicketStatus.schema';
import { NestedEnumTicketStatusFilterObjectSchema as NestedEnumTicketStatusFilterObjectSchema } from './NestedEnumTicketStatusFilter.schema'

const makeSchema = () => z.object({
  equals: TicketStatusSchema.optional(),
  in: TicketStatusSchema.array().optional(),
  notIn: TicketStatusSchema.array().optional(),
  not: z.union([TicketStatusSchema, z.lazy(() => NestedEnumTicketStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumTicketStatusFilterObjectSchema: z.ZodType<Prisma.EnumTicketStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumTicketStatusFilter>;
export const EnumTicketStatusFilterObjectZodSchema = makeSchema();
