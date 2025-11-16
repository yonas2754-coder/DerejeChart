import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCountOutputTypeCountCreatedTicketsArgsObjectSchema as UserCountOutputTypeCountCreatedTicketsArgsObjectSchema } from './UserCountOutputTypeCountCreatedTicketsArgs.schema';
import { UserCountOutputTypeCountHandledTicketsArgsObjectSchema as UserCountOutputTypeCountHandledTicketsArgsObjectSchema } from './UserCountOutputTypeCountHandledTicketsArgs.schema'

const makeSchema = () => z.object({
  createdTickets: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountCreatedTicketsArgsObjectSchema)]).optional(),
  handledTickets: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountHandledTicketsArgsObjectSchema)]).optional()
}).strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();
