import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketFindManySchema as TroubleTicketFindManySchema } from '../findManyTroubleTicket.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  createdTickets: z.union([z.boolean(), z.lazy(() => TroubleTicketFindManySchema)]).optional(),
  handledTickets: z.union([z.boolean(), z.lazy(() => TroubleTicketFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> = makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();
