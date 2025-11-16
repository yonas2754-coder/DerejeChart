import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutHandledTicketsInputObjectSchema as UserUpdateWithoutHandledTicketsInputObjectSchema } from './UserUpdateWithoutHandledTicketsInput.schema';
import { UserUncheckedUpdateWithoutHandledTicketsInputObjectSchema as UserUncheckedUpdateWithoutHandledTicketsInputObjectSchema } from './UserUncheckedUpdateWithoutHandledTicketsInput.schema';
import { UserCreateWithoutHandledTicketsInputObjectSchema as UserCreateWithoutHandledTicketsInputObjectSchema } from './UserCreateWithoutHandledTicketsInput.schema';
import { UserUncheckedCreateWithoutHandledTicketsInputObjectSchema as UserUncheckedCreateWithoutHandledTicketsInputObjectSchema } from './UserUncheckedCreateWithoutHandledTicketsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutHandledTicketsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutHandledTicketsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutHandledTicketsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutHandledTicketsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutHandledTicketsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutHandledTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutHandledTicketsInput>;
export const UserUpsertWithoutHandledTicketsInputObjectZodSchema = makeSchema();
