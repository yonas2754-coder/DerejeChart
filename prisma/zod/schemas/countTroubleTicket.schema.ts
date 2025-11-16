import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TroubleTicketOrderByWithRelationInputObjectSchema as TroubleTicketOrderByWithRelationInputObjectSchema } from './objects/TroubleTicketOrderByWithRelationInput.schema';
import { TroubleTicketWhereInputObjectSchema as TroubleTicketWhereInputObjectSchema } from './objects/TroubleTicketWhereInput.schema';
import { TroubleTicketWhereUniqueInputObjectSchema as TroubleTicketWhereUniqueInputObjectSchema } from './objects/TroubleTicketWhereUniqueInput.schema';
import { TroubleTicketCountAggregateInputObjectSchema as TroubleTicketCountAggregateInputObjectSchema } from './objects/TroubleTicketCountAggregateInput.schema';

export const TroubleTicketCountSchema: z.ZodType<Prisma.TroubleTicketCountArgs> = z.object({ orderBy: z.union([TroubleTicketOrderByWithRelationInputObjectSchema, TroubleTicketOrderByWithRelationInputObjectSchema.array()]).optional(), where: TroubleTicketWhereInputObjectSchema.optional(), cursor: TroubleTicketWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), TroubleTicketCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.TroubleTicketCountArgs>;

export const TroubleTicketCountZodSchema = z.object({ orderBy: z.union([TroubleTicketOrderByWithRelationInputObjectSchema, TroubleTicketOrderByWithRelationInputObjectSchema.array()]).optional(), where: TroubleTicketWhereInputObjectSchema.optional(), cursor: TroubleTicketWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), TroubleTicketCountAggregateInputObjectSchema ]).optional() }).strict();