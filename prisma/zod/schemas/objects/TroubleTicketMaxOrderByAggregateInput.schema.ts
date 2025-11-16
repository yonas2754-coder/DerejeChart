import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  serviceNumber: SortOrderSchema.optional(),
  tasksClassification: SortOrderSchema.optional(),
  requestType: SortOrderSchema.optional(),
  specificRequestType: SortOrderSchema.optional(),
  zone: SortOrderSchema.optional(),
  remarks: SortOrderSchema.optional(),
  priority: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  pending_endAt: SortOrderSchema.optional(),
  resolvedAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  createdById: SortOrderSchema.optional(),
  handlerId: SortOrderSchema.optional()
}).strict();
export const TroubleTicketMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TroubleTicketMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketMaxOrderByAggregateInput>;
export const TroubleTicketMaxOrderByAggregateInputObjectZodSchema = makeSchema();
