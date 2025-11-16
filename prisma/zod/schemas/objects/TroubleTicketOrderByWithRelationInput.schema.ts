import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

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
  createdBy: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  handler: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const TroubleTicketOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.TroubleTicketOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketOrderByWithRelationInput>;
export const TroubleTicketOrderByWithRelationInputObjectZodSchema = makeSchema();
