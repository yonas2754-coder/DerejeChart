import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ZoneSchema } from '../enums/Zone.schema'

const nestedenumzonefilterSchema = z.object({
  equals: ZoneSchema.optional(),
  in: ZoneSchema.array().optional(),
  notIn: ZoneSchema.array().optional(),
  not: z.union([ZoneSchema, z.lazy(() => NestedEnumZoneFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumZoneFilterObjectSchema: z.ZodType<Prisma.NestedEnumZoneFilter> = nestedenumzonefilterSchema as unknown as z.ZodType<Prisma.NestedEnumZoneFilter>;
export const NestedEnumZoneFilterObjectZodSchema = nestedenumzonefilterSchema;
