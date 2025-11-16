import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RequestTypeSchema } from '../enums/RequestType.schema'

const nestedenumrequesttypefilterSchema = z.object({
  equals: RequestTypeSchema.optional(),
  in: RequestTypeSchema.array().optional(),
  notIn: RequestTypeSchema.array().optional(),
  not: z.union([RequestTypeSchema, z.lazy(() => NestedEnumRequestTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumRequestTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumRequestTypeFilter> = nestedenumrequesttypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumRequestTypeFilter>;
export const NestedEnumRequestTypeFilterObjectZodSchema = nestedenumrequesttypefilterSchema;
