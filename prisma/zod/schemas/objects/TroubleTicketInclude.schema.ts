import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  createdBy: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  handler: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const TroubleTicketIncludeObjectSchema: z.ZodType<Prisma.TroubleTicketInclude> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketInclude>;
export const TroubleTicketIncludeObjectZodSchema = makeSchema();
