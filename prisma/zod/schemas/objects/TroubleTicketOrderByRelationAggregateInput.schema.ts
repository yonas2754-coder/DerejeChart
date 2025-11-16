import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const TroubleTicketOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.TroubleTicketOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketOrderByRelationAggregateInput>;
export const TroubleTicketOrderByRelationAggregateInputObjectZodSchema = makeSchema();
