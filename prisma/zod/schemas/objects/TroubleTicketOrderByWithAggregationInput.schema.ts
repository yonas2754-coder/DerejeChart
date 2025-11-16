import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { TroubleTicketCountOrderByAggregateInputObjectSchema as TroubleTicketCountOrderByAggregateInputObjectSchema } from './TroubleTicketCountOrderByAggregateInput.schema';
import { TroubleTicketMaxOrderByAggregateInputObjectSchema as TroubleTicketMaxOrderByAggregateInputObjectSchema } from './TroubleTicketMaxOrderByAggregateInput.schema';
import { TroubleTicketMinOrderByAggregateInputObjectSchema as TroubleTicketMinOrderByAggregateInputObjectSchema } from './TroubleTicketMinOrderByAggregateInput.schema'

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
  pending_endAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  resolvedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  createdById: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  handlerId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => TroubleTicketCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => TroubleTicketMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => TroubleTicketMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const TroubleTicketOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.TroubleTicketOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketOrderByWithAggregationInput>;
export const TroubleTicketOrderByWithAggregationInputObjectZodSchema = makeSchema();
