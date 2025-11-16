import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TicketStatusSchema } from '../enums/TicketStatus.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumTicketStatusFilterObjectSchema as NestedEnumTicketStatusFilterObjectSchema } from './NestedEnumTicketStatusFilter.schema'

const nestedenumticketstatuswithaggregatesfilterSchema = z.object({
  equals: TicketStatusSchema.optional(),
  in: TicketStatusSchema.array().optional(),
  notIn: TicketStatusSchema.array().optional(),
  not: z.union([TicketStatusSchema, z.lazy(() => NestedEnumTicketStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumTicketStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumTicketStatusFilterObjectSchema).optional()
}).strict();
export const NestedEnumTicketStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumTicketStatusWithAggregatesFilter> = nestedenumticketstatuswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumTicketStatusWithAggregatesFilter>;
export const NestedEnumTicketStatusWithAggregatesFilterObjectZodSchema = nestedenumticketstatuswithaggregatesfilterSchema;
