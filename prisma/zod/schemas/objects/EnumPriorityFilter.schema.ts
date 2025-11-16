import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PrioritySchema } from '../enums/Priority.schema';
import { NestedEnumPriorityFilterObjectSchema as NestedEnumPriorityFilterObjectSchema } from './NestedEnumPriorityFilter.schema'

const makeSchema = () => z.object({
  equals: PrioritySchema.optional(),
  in: PrioritySchema.array().optional(),
  notIn: PrioritySchema.array().optional(),
  not: z.union([PrioritySchema, z.lazy(() => NestedEnumPriorityFilterObjectSchema)]).optional()
}).strict();
export const EnumPriorityFilterObjectSchema: z.ZodType<Prisma.EnumPriorityFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPriorityFilter>;
export const EnumPriorityFilterObjectZodSchema = makeSchema();
