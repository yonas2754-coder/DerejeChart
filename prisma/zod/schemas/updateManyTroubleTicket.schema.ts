import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TroubleTicketUpdateManyMutationInputObjectSchema as TroubleTicketUpdateManyMutationInputObjectSchema } from './objects/TroubleTicketUpdateManyMutationInput.schema';
import { TroubleTicketWhereInputObjectSchema as TroubleTicketWhereInputObjectSchema } from './objects/TroubleTicketWhereInput.schema';

export const TroubleTicketUpdateManySchema: z.ZodType<Prisma.TroubleTicketUpdateManyArgs> = z.object({ data: TroubleTicketUpdateManyMutationInputObjectSchema, where: TroubleTicketWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TroubleTicketUpdateManyArgs>;

export const TroubleTicketUpdateManyZodSchema = z.object({ data: TroubleTicketUpdateManyMutationInputObjectSchema, where: TroubleTicketWhereInputObjectSchema.optional() }).strict();