import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketWhereInputObjectSchema as TroubleTicketWhereInputObjectSchema } from './TroubleTicketWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => TroubleTicketWhereInputObjectSchema).optional(),
  some: z.lazy(() => TroubleTicketWhereInputObjectSchema).optional(),
  none: z.lazy(() => TroubleTicketWhereInputObjectSchema).optional()
}).strict();
export const TroubleTicketListRelationFilterObjectSchema: z.ZodType<Prisma.TroubleTicketListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketListRelationFilter>;
export const TroubleTicketListRelationFilterObjectZodSchema = makeSchema();
