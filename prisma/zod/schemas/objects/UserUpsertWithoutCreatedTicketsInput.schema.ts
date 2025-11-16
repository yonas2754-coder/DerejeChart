import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutCreatedTicketsInputObjectSchema as UserUpdateWithoutCreatedTicketsInputObjectSchema } from './UserUpdateWithoutCreatedTicketsInput.schema';
import { UserUncheckedUpdateWithoutCreatedTicketsInputObjectSchema as UserUncheckedUpdateWithoutCreatedTicketsInputObjectSchema } from './UserUncheckedUpdateWithoutCreatedTicketsInput.schema';
import { UserCreateWithoutCreatedTicketsInputObjectSchema as UserCreateWithoutCreatedTicketsInputObjectSchema } from './UserCreateWithoutCreatedTicketsInput.schema';
import { UserUncheckedCreateWithoutCreatedTicketsInputObjectSchema as UserUncheckedCreateWithoutCreatedTicketsInputObjectSchema } from './UserUncheckedCreateWithoutCreatedTicketsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutCreatedTicketsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCreatedTicketsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutCreatedTicketsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCreatedTicketsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutCreatedTicketsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutCreatedTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutCreatedTicketsInput>;
export const UserUpsertWithoutCreatedTicketsInputObjectZodSchema = makeSchema();
