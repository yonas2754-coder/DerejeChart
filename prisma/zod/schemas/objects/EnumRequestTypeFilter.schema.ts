import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { NestedEnumRequestTypeFilterObjectSchema as NestedEnumRequestTypeFilterObjectSchema } from './NestedEnumRequestTypeFilter.schema'

const makeSchema = () => z.object({
  equals: RequestTypeSchema.optional(),
  in: RequestTypeSchema.array().optional(),
  notIn: RequestTypeSchema.array().optional(),
  not: z.union([RequestTypeSchema, z.lazy(() => NestedEnumRequestTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumRequestTypeFilterObjectSchema: z.ZodType<Prisma.EnumRequestTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumRequestTypeFilter>;
export const EnumRequestTypeFilterObjectZodSchema = makeSchema();
