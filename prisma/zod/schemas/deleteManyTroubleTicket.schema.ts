import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TroubleTicketWhereInputObjectSchema as TroubleTicketWhereInputObjectSchema } from './objects/TroubleTicketWhereInput.schema';

export const TroubleTicketDeleteManySchema: z.ZodType<Prisma.TroubleTicketDeleteManyArgs> = z.object({ where: TroubleTicketWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TroubleTicketDeleteManyArgs>;

export const TroubleTicketDeleteManyZodSchema = z.object({ where: TroubleTicketWhereInputObjectSchema.optional() }).strict();