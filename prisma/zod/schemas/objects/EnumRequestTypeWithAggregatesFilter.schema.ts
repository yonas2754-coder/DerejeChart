import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { NestedEnumRequestTypeWithAggregatesFilterObjectSchema as NestedEnumRequestTypeWithAggregatesFilterObjectSchema } from './NestedEnumRequestTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumRequestTypeFilterObjectSchema as NestedEnumRequestTypeFilterObjectSchema } from './NestedEnumRequestTypeFilter.schema'

const makeSchema = () => z.object({
  equals: RequestTypeSchema.optional(),
  in: RequestTypeSchema.array().optional(),
  notIn: RequestTypeSchema.array().optional(),
  not: z.union([RequestTypeSchema, z.lazy(() => NestedEnumRequestTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumRequestTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumRequestTypeFilterObjectSchema).optional()
}).strict();
export const EnumRequestTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumRequestTypeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumRequestTypeWithAggregatesFilter>;
export const EnumRequestTypeWithAggregatesFilterObjectZodSchema = makeSchema();
