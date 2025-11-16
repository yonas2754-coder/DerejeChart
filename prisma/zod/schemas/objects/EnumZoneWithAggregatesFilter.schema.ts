import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ZoneSchema } from '../enums/Zone.schema';
import { NestedEnumZoneWithAggregatesFilterObjectSchema as NestedEnumZoneWithAggregatesFilterObjectSchema } from './NestedEnumZoneWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumZoneFilterObjectSchema as NestedEnumZoneFilterObjectSchema } from './NestedEnumZoneFilter.schema'

const makeSchema = () => z.object({
  equals: ZoneSchema.optional(),
  in: ZoneSchema.array().optional(),
  notIn: ZoneSchema.array().optional(),
  not: z.union([ZoneSchema, z.lazy(() => NestedEnumZoneWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumZoneFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumZoneFilterObjectSchema).optional()
}).strict();
export const EnumZoneWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumZoneWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumZoneWithAggregatesFilter>;
export const EnumZoneWithAggregatesFilterObjectZodSchema = makeSchema();
