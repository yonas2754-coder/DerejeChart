import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketSelectObjectSchema as TroubleTicketSelectObjectSchema } from './TroubleTicketSelect.schema';
import { TroubleTicketIncludeObjectSchema as TroubleTicketIncludeObjectSchema } from './TroubleTicketInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => TroubleTicketSelectObjectSchema).optional(),
  include: z.lazy(() => TroubleTicketIncludeObjectSchema).optional()
}).strict();
export const TroubleTicketArgsObjectSchema = makeSchema();
export const TroubleTicketArgsObjectZodSchema = makeSchema();
