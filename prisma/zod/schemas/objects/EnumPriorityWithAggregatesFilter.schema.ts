import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PrioritySchema } from '../enums/Priority.schema';
import { NestedEnumPriorityWithAggregatesFilterObjectSchema as NestedEnumPriorityWithAggregatesFilterObjectSchema } from './NestedEnumPriorityWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumPriorityFilterObjectSchema as NestedEnumPriorityFilterObjectSchema } from './NestedEnumPriorityFilter.schema'

const makeSchema = () => z.object({
  equals: PrioritySchema.optional(),
  in: PrioritySchema.array().optional(),
  notIn: PrioritySchema.array().optional(),
  not: z.union([PrioritySchema, z.lazy(() => NestedEnumPriorityWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumPriorityFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumPriorityFilterObjectSchema).optional()
}).strict();
export const EnumPriorityWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumPriorityWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPriorityWithAggregatesFilter>;
export const EnumPriorityWithAggregatesFilterObjectZodSchema = makeSchema();
