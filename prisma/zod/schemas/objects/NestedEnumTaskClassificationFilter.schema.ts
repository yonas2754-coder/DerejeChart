import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskClassificationSchema } from '../enums/TaskClassification.schema'

const nestedenumtaskclassificationfilterSchema = z.object({
  equals: TaskClassificationSchema.optional(),
  in: TaskClassificationSchema.array().optional(),
  notIn: TaskClassificationSchema.array().optional(),
  not: z.union([TaskClassificationSchema, z.lazy(() => NestedEnumTaskClassificationFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumTaskClassificationFilterObjectSchema: z.ZodType<Prisma.NestedEnumTaskClassificationFilter> = nestedenumtaskclassificationfilterSchema as unknown as z.ZodType<Prisma.NestedEnumTaskClassificationFilter>;
export const NestedEnumTaskClassificationFilterObjectZodSchema = nestedenumtaskclassificationfilterSchema;
