import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { TroubleTicketUncheckedCreateNestedManyWithoutCreatedByInputObjectSchema as TroubleTicketUncheckedCreateNestedManyWithoutCreatedByInputObjectSchema } from './TroubleTicketUncheckedCreateNestedManyWithoutCreatedByInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  password: z.string(),
  image: z.string().optional().nullable(),
  role: RoleSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdTickets: z.lazy(() => TroubleTicketUncheckedCreateNestedManyWithoutCreatedByInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutHandledTicketsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutHandledTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutHandledTicketsInput>;
export const UserUncheckedCreateWithoutHandledTicketsInputObjectZodSchema = makeSchema();
