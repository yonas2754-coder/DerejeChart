import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { TroubleTicketCreateNestedManyWithoutHandlerInputObjectSchema as TroubleTicketCreateNestedManyWithoutHandlerInputObjectSchema } from './TroubleTicketCreateNestedManyWithoutHandlerInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  password: z.string(),
  image: z.string().optional().nullable(),
  role: RoleSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  handledTickets: z.lazy(() => TroubleTicketCreateNestedManyWithoutHandlerInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutCreatedTicketsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutCreatedTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutCreatedTicketsInput>;
export const UserCreateWithoutCreatedTicketsInputObjectZodSchema = makeSchema();
