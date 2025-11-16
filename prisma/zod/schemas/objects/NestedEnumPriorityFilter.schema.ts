import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PrioritySchema } from '../enums/Priority.schema'

const nestedenumpriorityfilterSchema = z.object({
  equals: PrioritySchema.optional(),
  in: PrioritySchema.array().optional(),
  notIn: PrioritySchema.array().optional(),
  not: z.union([PrioritySchema, z.lazy(() => NestedEnumPriorityFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumPriorityFilterObjectSchema: z.ZodType<Prisma.NestedEnumPriorityFilter> = nestedenumpriorityfilterSchema as unknown as z.ZodType<Prisma.NestedEnumPriorityFilter>;
export const NestedEnumPriorityFilterObjectZodSchema = nestedenumpriorityfilterSchema;
