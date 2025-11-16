import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskClassificationSchema } from '../enums/TaskClassification.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumTaskClassificationFilterObjectSchema as NestedEnumTaskClassificationFilterObjectSchema } from './NestedEnumTaskClassificationFilter.schema'

const nestedenumtaskclassificationwithaggregatesfilterSchema = z.object({
  equals: TaskClassificationSchema.optional(),
  in: TaskClassificationSchema.array().optional(),
  notIn: TaskClassificationSchema.array().optional(),
  not: z.union([TaskClassificationSchema, z.lazy(() => NestedEnumTaskClassificationWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskClassificationFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskClassificationFilterObjectSchema).optional()
}).strict();
export const NestedEnumTaskClassificationWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumTaskClassificationWithAggregatesFilter> = nestedenumtaskclassificationwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumTaskClassificationWithAggregatesFilter>;
export const NestedEnumTaskClassificationWithAggregatesFilterObjectZodSchema = nestedenumtaskclassificationwithaggregatesfilterSchema;
