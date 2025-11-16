import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TroubleTicketCreateManyInputObjectSchema as TroubleTicketCreateManyInputObjectSchema } from './objects/TroubleTicketCreateManyInput.schema';

export const TroubleTicketCreateManySchema: z.ZodType<Prisma.TroubleTicketCreateManyArgs> = z.object({ data: z.union([ TroubleTicketCreateManyInputObjectSchema, z.array(TroubleTicketCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.TroubleTicketCreateManyArgs>;

export const TroubleTicketCreateManyZodSchema = z.object({ data: z.union([ TroubleTicketCreateManyInputObjectSchema, z.array(TroubleTicketCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();