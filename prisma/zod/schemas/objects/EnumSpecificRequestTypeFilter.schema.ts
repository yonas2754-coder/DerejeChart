import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SpecificRequestTypeSchema } from '../enums/SpecificRequestType.schema';
import { NestedEnumSpecificRequestTypeFilterObjectSchema as NestedEnumSpecificRequestTypeFilterObjectSchema } from './NestedEnumSpecificRequestTypeFilter.schema'

const makeSchema = () => z.object({
  equals: SpecificRequestTypeSchema.optional(),
  in: SpecificRequestTypeSchema.array().optional(),
  notIn: SpecificRequestTypeSchema.array().optional(),
  not: z.union([SpecificRequestTypeSchema, z.lazy(() => NestedEnumSpecificRequestTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumSpecificRequestTypeFilterObjectSchema: z.ZodType<Prisma.EnumSpecificRequestTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumSpecificRequestTypeFilter>;
export const EnumSpecificRequestTypeFilterObjectZodSchema = makeSchema();
