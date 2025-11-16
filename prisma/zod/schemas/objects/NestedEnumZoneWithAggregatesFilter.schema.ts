import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ZoneSchema } from '../enums/Zone.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumZoneFilterObjectSchema as NestedEnumZoneFilterObjectSchema } from './NestedEnumZoneFilter.schema'

const nestedenumzonewithaggregatesfilterSchema = z.object({
  equals: ZoneSchema.optional(),
  in: ZoneSchema.array().optional(),
  notIn: ZoneSchema.array().optional(),
  not: z.union([ZoneSchema, z.lazy(() => NestedEnumZoneWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumZoneFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumZoneFilterObjectSchema).optional()
}).strict();
export const NestedEnumZoneWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumZoneWithAggregatesFilter> = nestedenumzonewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumZoneWithAggregatesFilter>;
export const NestedEnumZoneWithAggregatesFilterObjectZodSchema = nestedenumzonewithaggregatesfilterSchema;
