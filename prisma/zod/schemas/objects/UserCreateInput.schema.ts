import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleSchema } from '../enums/Role.schema';
import { TroubleTicketCreateNestedManyWithoutCreatedByInputObjectSchema as TroubleTicketCreateNestedManyWithoutCreatedByInputObjectSchema } from './TroubleTicketCreateNestedManyWithoutCreatedByInput.schema';
import { TroubleTicketCreateNestedManyWithoutHandlerInputObjectSchema as TroubleTicketCreateNestedManyWithoutHandlerInputObjectSchema } from './TroubleTicketCreateNestedManyWithoutHandlerInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string(),
  password: z.string(),
  image: z.string().optional().nullable(),
  role: RoleSchema.optional(),
  createdAt: z.coerce.date().optional(),
  createdTickets: z.lazy(() => TroubleTicketCreateNestedManyWithoutCreatedByInputObjectSchema),
  handledTickets: z.lazy(() => TroubleTicketCreateNestedManyWithoutHandlerInputObjectSchema)
}).strict();
export const UserCreateInputObjectSchema: z.ZodType<Prisma.UserCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateInput>;
export const UserCreateInputObjectZodSchema = makeSchema();
