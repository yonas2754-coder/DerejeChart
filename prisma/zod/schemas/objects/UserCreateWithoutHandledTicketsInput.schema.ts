import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { TroubleTicketCreateNestedManyWithoutCreatedByInputObjectSchema as TroubleTicketCreateNestedManyWithoutCreatedByInputObjectSchema } from './TroubleTicketCreateNestedManyWithoutCreatedByInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  password: z.string(),
  image: z.string().optional().nullable(),
  role: RoleSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdTickets: z.lazy(() => TroubleTicketCreateNestedManyWithoutCreatedByInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutHandledTicketsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutHandledTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutHandledTicketsInput>;
export const UserCreateWithoutHandledTicketsInputObjectZodSchema = makeSchema();
