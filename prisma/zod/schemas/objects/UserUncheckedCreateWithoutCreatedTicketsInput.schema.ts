import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { TroubleTicketUncheckedCreateNestedManyWithoutHandlerInputObjectSchema as TroubleTicketUncheckedCreateNestedManyWithoutHandlerInputObjectSchema } from './TroubleTicketUncheckedCreateNestedManyWithoutHandlerInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  password: z.string(),
  image: z.string().optional().nullable(),
  role: RoleSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  handledTickets: z.lazy(() => TroubleTicketUncheckedCreateNestedManyWithoutHandlerInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutCreatedTicketsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCreatedTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutCreatedTicketsInput>;
export const UserUncheckedCreateWithoutCreatedTicketsInputObjectZodSchema = makeSchema();
