import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SpecificRequestTypeSchema } from '../enums/SpecificRequestType.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumSpecificRequestTypeFilterObjectSchema as NestedEnumSpecificRequestTypeFilterObjectSchema } from './NestedEnumSpecificRequestTypeFilter.schema'

const nestedenumspecificrequesttypewithaggregatesfilterSchema = z.object({
  equals: SpecificRequestTypeSchema.optional(),
  in: SpecificRequestTypeSchema.array().optional(),
  notIn: SpecificRequestTypeSchema.array().optional(),
  not: z.union([SpecificRequestTypeSchema, z.lazy(() => NestedEnumSpecificRequestTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumSpecificRequestTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumSpecificRequestTypeFilterObjectSchema).optional()
}).strict();
export const NestedEnumSpecificRequestTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumSpecificRequestTypeWithAggregatesFilter> = nestedenumspecificrequesttypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumSpecificRequestTypeWithAggregatesFilter>;
export const NestedEnumSpecificRequestTypeWithAggregatesFilterObjectZodSchema = nestedenumspecificrequesttypewithaggregatesfilterSchema;
