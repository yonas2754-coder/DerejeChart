import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SpecificRequestTypeSchema } from '../enums/SpecificRequestType.schema'

const nestedenumspecificrequesttypefilterSchema = z.object({
  equals: SpecificRequestTypeSchema.optional(),
  in: SpecificRequestTypeSchema.array().optional(),
  notIn: SpecificRequestTypeSchema.array().optional(),
  not: z.union([SpecificRequestTypeSchema, z.lazy(() => NestedEnumSpecificRequestTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumSpecificRequestTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumSpecificRequestTypeFilter> = nestedenumspecificrequesttypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumSpecificRequestTypeFilter>;
export const NestedEnumSpecificRequestTypeFilterObjectZodSchema = nestedenumspecificrequesttypefilterSchema;
