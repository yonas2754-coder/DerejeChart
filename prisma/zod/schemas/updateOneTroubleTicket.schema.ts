import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TroubleTicketSelectObjectSchema as TroubleTicketSelectObjectSchema } from './objects/TroubleTicketSelect.schema';
import { TroubleTicketIncludeObjectSchema as TroubleTicketIncludeObjectSchema } from './objects/TroubleTicketInclude.schema';
import { TroubleTicketUpdateInputObjectSchema as TroubleTicketUpdateInputObjectSchema } from './objects/TroubleTicketUpdateInput.schema';
import { TroubleTicketUncheckedUpdateInputObjectSchema as TroubleTicketUncheckedUpdateInputObjectSchema } from './objects/TroubleTicketUncheckedUpdateInput.schema';
import { TroubleTicketWhereUniqueInputObjectSchema as TroubleTicketWhereUniqueInputObjectSchema } from './objects/TroubleTicketWhereUniqueInput.schema';

export const TroubleTicketUpdateOneSchema: z.ZodType<Prisma.TroubleTicketUpdateArgs> = z.object({ select: TroubleTicketSelectObjectSchema.optional(), include: TroubleTicketIncludeObjectSchema.optional(), data: z.union([TroubleTicketUpdateInputObjectSchema, TroubleTicketUncheckedUpdateInputObjectSchema]), where: TroubleTicketWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.TroubleTicketUpdateArgs>;

export const TroubleTicketUpdateOneZodSchema = z.object({ select: TroubleTicketSelectObjectSchema.optional(), include: TroubleTicketIncludeObjectSchema.optional(), data: z.union([TroubleTicketUpdateInputObjectSchema, TroubleTicketUncheckedUpdateInputObjectSchema]), where: TroubleTicketWhereUniqueInputObjectSchema }).strict();