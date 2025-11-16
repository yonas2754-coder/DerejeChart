import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TroubleTicketSelectObjectSchema as TroubleTicketSelectObjectSchema } from './objects/TroubleTicketSelect.schema';
import { TroubleTicketIncludeObjectSchema as TroubleTicketIncludeObjectSchema } from './objects/TroubleTicketInclude.schema';
import { TroubleTicketWhereUniqueInputObjectSchema as TroubleTicketWhereUniqueInputObjectSchema } from './objects/TroubleTicketWhereUniqueInput.schema';
import { TroubleTicketCreateInputObjectSchema as TroubleTicketCreateInputObjectSchema } from './objects/TroubleTicketCreateInput.schema';
import { TroubleTicketUncheckedCreateInputObjectSchema as TroubleTicketUncheckedCreateInputObjectSchema } from './objects/TroubleTicketUncheckedCreateInput.schema';
import { TroubleTicketUpdateInputObjectSchema as TroubleTicketUpdateInputObjectSchema } from './objects/TroubleTicketUpdateInput.schema';
import { TroubleTicketUncheckedUpdateInputObjectSchema as TroubleTicketUncheckedUpdateInputObjectSchema } from './objects/TroubleTicketUncheckedUpdateInput.schema';

export const TroubleTicketUpsertOneSchema: z.ZodType<Prisma.TroubleTicketUpsertArgs> = z.object({ select: TroubleTicketSelectObjectSchema.optional(), include: TroubleTicketIncludeObjectSchema.optional(), where: TroubleTicketWhereUniqueInputObjectSchema, create: z.union([ TroubleTicketCreateInputObjectSchema, TroubleTicketUncheckedCreateInputObjectSchema ]), update: z.union([ TroubleTicketUpdateInputObjectSchema, TroubleTicketUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.TroubleTicketUpsertArgs>;

export const TroubleTicketUpsertOneZodSchema = z.object({ select: TroubleTicketSelectObjectSchema.optional(), include: TroubleTicketIncludeObjectSchema.optional(), where: TroubleTicketWhereUniqueInputObjectSchema, create: z.union([ TroubleTicketCreateInputObjectSchema, TroubleTicketUncheckedCreateInputObjectSchema ]), update: z.union([ TroubleTicketUpdateInputObjectSchema, TroubleTicketUncheckedUpdateInputObjectSchema ]) }).strict();