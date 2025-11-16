import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TroubleTicketSelectObjectSchema as TroubleTicketSelectObjectSchema } from './objects/TroubleTicketSelect.schema';
import { TroubleTicketIncludeObjectSchema as TroubleTicketIncludeObjectSchema } from './objects/TroubleTicketInclude.schema';
import { TroubleTicketCreateInputObjectSchema as TroubleTicketCreateInputObjectSchema } from './objects/TroubleTicketCreateInput.schema';
import { TroubleTicketUncheckedCreateInputObjectSchema as TroubleTicketUncheckedCreateInputObjectSchema } from './objects/TroubleTicketUncheckedCreateInput.schema';

export const TroubleTicketCreateOneSchema: z.ZodType<Prisma.TroubleTicketCreateArgs> = z.object({ select: TroubleTicketSelectObjectSchema.optional(), include: TroubleTicketIncludeObjectSchema.optional(), data: z.union([TroubleTicketCreateInputObjectSchema, TroubleTicketUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.TroubleTicketCreateArgs>;

export const TroubleTicketCreateOneZodSchema = z.object({ select: TroubleTicketSelectObjectSchema.optional(), include: TroubleTicketIncludeObjectSchema.optional(), data: z.union([TroubleTicketCreateInputObjectSchema, TroubleTicketUncheckedCreateInputObjectSchema]) }).strict();