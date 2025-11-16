import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TroubleTicketIncludeObjectSchema as TroubleTicketIncludeObjectSchema } from './objects/TroubleTicketInclude.schema';
import { TroubleTicketOrderByWithRelationInputObjectSchema as TroubleTicketOrderByWithRelationInputObjectSchema } from './objects/TroubleTicketOrderByWithRelationInput.schema';
import { TroubleTicketWhereInputObjectSchema as TroubleTicketWhereInputObjectSchema } from './objects/TroubleTicketWhereInput.schema';
import { TroubleTicketWhereUniqueInputObjectSchema as TroubleTicketWhereUniqueInputObjectSchema } from './objects/TroubleTicketWhereUniqueInput.schema';
import { TroubleTicketScalarFieldEnumSchema } from './enums/TroubleTicketScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TroubleTicketFindFirstOrThrowSelectSchema: z.ZodType<Prisma.TroubleTicketSelect> = z.object({
    id: z.boolean().optional(),
    serviceNumber: z.boolean().optional(),
    tasksClassification: z.boolean().optional(),
    requestType: z.boolean().optional(),
    specificRequestType: z.boolean().optional(),
    zone: z.boolean().optional(),
    remarks: z.boolean().optional(),
    priority: z.boolean().optional(),
    status: z.boolean().optional(),
    pending_endAt: z.boolean().optional(),
    resolvedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    createdById: z.boolean().optional(),
    createdBy: z.boolean().optional(),
    handlerId: z.boolean().optional(),
    handler: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.TroubleTicketSelect>;

export const TroubleTicketFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    serviceNumber: z.boolean().optional(),
    tasksClassification: z.boolean().optional(),
    requestType: z.boolean().optional(),
    specificRequestType: z.boolean().optional(),
    zone: z.boolean().optional(),
    remarks: z.boolean().optional(),
    priority: z.boolean().optional(),
    status: z.boolean().optional(),
    pending_endAt: z.boolean().optional(),
    resolvedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    createdById: z.boolean().optional(),
    createdBy: z.boolean().optional(),
    handlerId: z.boolean().optional(),
    handler: z.boolean().optional()
  }).strict();

export const TroubleTicketFindFirstOrThrowSchema: z.ZodType<Prisma.TroubleTicketFindFirstOrThrowArgs> = z.object({ select: TroubleTicketFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => TroubleTicketIncludeObjectSchema.optional()), orderBy: z.union([TroubleTicketOrderByWithRelationInputObjectSchema, TroubleTicketOrderByWithRelationInputObjectSchema.array()]).optional(), where: TroubleTicketWhereInputObjectSchema.optional(), cursor: TroubleTicketWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([TroubleTicketScalarFieldEnumSchema, TroubleTicketScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.TroubleTicketFindFirstOrThrowArgs>;

export const TroubleTicketFindFirstOrThrowZodSchema = z.object({ select: TroubleTicketFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => TroubleTicketIncludeObjectSchema.optional()), orderBy: z.union([TroubleTicketOrderByWithRelationInputObjectSchema, TroubleTicketOrderByWithRelationInputObjectSchema.array()]).optional(), where: TroubleTicketWhereInputObjectSchema.optional(), cursor: TroubleTicketWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([TroubleTicketScalarFieldEnumSchema, TroubleTicketScalarFieldEnumSchema.array()]).optional() }).strict();