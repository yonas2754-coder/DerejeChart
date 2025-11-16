import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TroubleTicketSelectObjectSchema as TroubleTicketSelectObjectSchema } from './objects/TroubleTicketSelect.schema';
import { TroubleTicketCreateManyInputObjectSchema as TroubleTicketCreateManyInputObjectSchema } from './objects/TroubleTicketCreateManyInput.schema';

export const TroubleTicketCreateManyAndReturnSchema: z.ZodType<Prisma.TroubleTicketCreateManyAndReturnArgs> = z.object({ select: TroubleTicketSelectObjectSchema.optional(), data: z.union([ TroubleTicketCreateManyInputObjectSchema, z.array(TroubleTicketCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.TroubleTicketCreateManyAndReturnArgs>;

export const TroubleTicketCreateManyAndReturnZodSchema = z.object({ select: TroubleTicketSelectObjectSchema.optional(), data: z.union([ TroubleTicketCreateManyInputObjectSchema, z.array(TroubleTicketCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();