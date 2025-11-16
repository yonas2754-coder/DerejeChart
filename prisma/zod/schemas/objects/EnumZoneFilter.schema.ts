import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ZoneSchema } from '../enums/Zone.schema';
import { NestedEnumZoneFilterObjectSchema as NestedEnumZoneFilterObjectSchema } from './NestedEnumZoneFilter.schema'

const makeSchema = () => z.object({
  equals: ZoneSchema.optional(),
  in: ZoneSchema.array().optional(),
  notIn: ZoneSchema.array().optional(),
  not: z.union([ZoneSchema, z.lazy(() => NestedEnumZoneFilterObjectSchema)]).optional()
}).strict();
export const EnumZoneFilterObjectSchema: z.ZodType<Prisma.EnumZoneFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumZoneFilter>;
export const EnumZoneFilterObjectZodSchema = makeSchema();
