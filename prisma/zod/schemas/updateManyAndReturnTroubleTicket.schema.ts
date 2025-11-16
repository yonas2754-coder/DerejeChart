import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TroubleTicketSelectObjectSchema as TroubleTicketSelectObjectSchema } from './objects/TroubleTicketSelect.schema';
import { TroubleTicketUpdateManyMutationInputObjectSchema as TroubleTicketUpdateManyMutationInputObjectSchema } from './objects/TroubleTicketUpdateManyMutationInput.schema';
import { TroubleTicketWhereInputObjectSchema as TroubleTicketWhereInputObjectSchema } from './objects/TroubleTicketWhereInput.schema';

export const TroubleTicketUpdateManyAndReturnSchema: z.ZodType<Prisma.TroubleTicketUpdateManyAndReturnArgs> = z.object({ select: TroubleTicketSelectObjectSchema.optional(), data: TroubleTicketUpdateManyMutationInputObjectSchema, where: TroubleTicketWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TroubleTicketUpdateManyAndReturnArgs>;

export const TroubleTicketUpdateManyAndReturnZodSchema = z.object({ select: TroubleTicketSelectObjectSchema.optional(), data: TroubleTicketUpdateManyMutationInputObjectSchema, where: TroubleTicketWhereInputObjectSchema.optional() }).strict();