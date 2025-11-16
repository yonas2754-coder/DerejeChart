import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PrioritySchema } from '../enums/Priority.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumPriorityFilterObjectSchema as NestedEnumPriorityFilterObjectSchema } from './NestedEnumPriorityFilter.schema'

const nestedenumprioritywithaggregatesfilterSchema = z.object({
  equals: PrioritySchema.optional(),
  in: PrioritySchema.array().optional(),
  notIn: PrioritySchema.array().optional(),
  not: z.union([PrioritySchema, z.lazy(() => NestedEnumPriorityWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumPriorityFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumPriorityFilterObjectSchema).optional()
}).strict();
export const NestedEnumPriorityWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumPriorityWithAggregatesFilter> = nestedenumprioritywithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumPriorityWithAggregatesFilter>;
export const NestedEnumPriorityWithAggregatesFilterObjectZodSchema = nestedenumprioritywithaggregatesfilterSchema;
