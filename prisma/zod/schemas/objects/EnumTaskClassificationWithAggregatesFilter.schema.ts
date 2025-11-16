import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskClassificationSchema } from '../enums/TaskClassification.schema';
import { NestedEnumTaskClassificationWithAggregatesFilterObjectSchema as NestedEnumTaskClassificationWithAggregatesFilterObjectSchema } from './NestedEnumTaskClassificationWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumTaskClassificationFilterObjectSchema as NestedEnumTaskClassificationFilterObjectSchema } from './NestedEnumTaskClassificationFilter.schema'

const makeSchema = () => z.object({
  equals: TaskClassificationSchema.optional(),
  in: TaskClassificationSchema.array().optional(),
  notIn: TaskClassificationSchema.array().optional(),
  not: z.union([TaskClassificationSchema, z.lazy(() => NestedEnumTaskClassificationWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskClassificationFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskClassificationFilterObjectSchema).optional()
}).strict();
export const EnumTaskClassificationWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumTaskClassificationWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumTaskClassificationWithAggregatesFilter>;
export const EnumTaskClassificationWithAggregatesFilterObjectZodSchema = makeSchema();
