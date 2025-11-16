import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { TroubleTicketUncheckedCreateNestedManyWithoutCreatedByInputObjectSchema as TroubleTicketUncheckedCreateNestedManyWithoutCreatedByInputObjectSchema } from './TroubleTicketUncheckedCreateNestedManyWithoutCreatedByInput.schema';
import { TroubleTicketUncheckedCreateNestedManyWithoutHandlerInputObjectSchema as TroubleTicketUncheckedCreateNestedManyWithoutHandlerInputObjectSchema } from './TroubleTicketUncheckedCreateNestedManyWithoutHandlerInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  password: z.string(),
  image: z.string().optional().nullable(),
  role: RoleSchema.optional(),
  createdAt: z.coerce.date().optional(),
  createdTickets: z.lazy(() => TroubleTicketUncheckedCreateNestedManyWithoutCreatedByInputObjectSchema),
  handledTickets: z.lazy(() => TroubleTicketUncheckedCreateNestedManyWithoutHandlerInputObjectSchema)
}).strict();
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>;
export const UserUncheckedCreateInputObjectZodSchema = makeSchema();
