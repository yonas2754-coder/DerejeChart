import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskClassificationSchema } from '../enums/TaskClassification.schema';
import { NestedEnumTaskClassificationFilterObjectSchema as NestedEnumTaskClassificationFilterObjectSchema } from './NestedEnumTaskClassificationFilter.schema'

const makeSchema = () => z.object({
  equals: TaskClassificationSchema.optional(),
  in: TaskClassificationSchema.array().optional(),
  notIn: TaskClassificationSchema.array().optional(),
  not: z.union([TaskClassificationSchema, z.lazy(() => NestedEnumTaskClassificationFilterObjectSchema)]).optional()
}).strict();
export const EnumTaskClassificationFilterObjectSchema: z.ZodType<Prisma.EnumTaskClassificationFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumTaskClassificationFilter>;
export const EnumTaskClassificationFilterObjectZodSchema = makeSchema();
