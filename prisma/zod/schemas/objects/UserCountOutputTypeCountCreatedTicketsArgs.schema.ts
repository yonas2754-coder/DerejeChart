import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketWhereInputObjectSchema as TroubleTicketWhereInputObjectSchema } from './TroubleTicketWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TroubleTicketWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountCreatedTicketsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountCreatedTicketsArgsObjectZodSchema = makeSchema();
