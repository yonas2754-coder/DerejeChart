import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TicketStatusSchema } from '../enums/TicketStatus.schema';
import { NestedEnumTicketStatusWithAggregatesFilterObjectSchema as NestedEnumTicketStatusWithAggregatesFilterObjectSchema } from './NestedEnumTicketStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumTicketStatusFilterObjectSchema as NestedEnumTicketStatusFilterObjectSchema } from './NestedEnumTicketStatusFilter.schema'

const makeSchema = () => z.object({
  equals: TicketStatusSchema.optional(),
  in: TicketStatusSchema.array().optional(),
  notIn: TicketStatusSchema.array().optional(),
  not: z.union([TicketStatusSchema, z.lazy(() => NestedEnumTicketStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumTicketStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumTicketStatusFilterObjectSchema).optional()
}).strict();
export const EnumTicketStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumTicketStatusWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumTicketStatusWithAggregatesFilter>;
export const EnumTicketStatusWithAggregatesFilterObjectZodSchema = makeSchema();
