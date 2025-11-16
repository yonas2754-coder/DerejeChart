import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TroubleTicketSelectObjectSchema as TroubleTicketSelectObjectSchema } from './objects/TroubleTicketSelect.schema';
import { TroubleTicketIncludeObjectSchema as TroubleTicketIncludeObjectSchema } from './objects/TroubleTicketInclude.schema';
import { TroubleTicketWhereUniqueInputObjectSchema as TroubleTicketWhereUniqueInputObjectSchema } from './objects/TroubleTicketWhereUniqueInput.schema';

export const TroubleTicketFindUniqueSchema: z.ZodType<Prisma.TroubleTicketFindUniqueArgs> = z.object({ select: TroubleTicketSelectObjectSchema.optional(), include: TroubleTicketIncludeObjectSchema.optional(), where: TroubleTicketWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.TroubleTicketFindUniqueArgs>;

export const TroubleTicketFindUniqueZodSchema = z.object({ select: TroubleTicketSelectObjectSchema.optional(), include: TroubleTicketIncludeObjectSchema.optional(), where: TroubleTicketWhereUniqueInputObjectSchema }).strict();