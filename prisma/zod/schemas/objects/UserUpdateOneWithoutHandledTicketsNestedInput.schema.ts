import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutHandledTicketsInputObjectSchema as UserCreateWithoutHandledTicketsInputObjectSchema } from './UserCreateWithoutHandledTicketsInput.schema';
import { UserUncheckedCreateWithoutHandledTicketsInputObjectSchema as UserUncheckedCreateWithoutHandledTicketsInputObjectSchema } from './UserUncheckedCreateWithoutHandledTicketsInput.schema';
import { UserCreateOrConnectWithoutHandledTicketsInputObjectSchema as UserCreateOrConnectWithoutHandledTicketsInputObjectSchema } from './UserCreateOrConnectWithoutHandledTicketsInput.schema';
import { UserUpsertWithoutHandledTicketsInputObjectSchema as UserUpsertWithoutHandledTicketsInputObjectSchema } from './UserUpsertWithoutHandledTicketsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutHandledTicketsInputObjectSchema as UserUpdateToOneWithWhereWithoutHandledTicketsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutHandledTicketsInput.schema';
import { UserUpdateWithoutHandledTicketsInputObjectSchema as UserUpdateWithoutHandledTicketsInputObjectSchema } from './UserUpdateWithoutHandledTicketsInput.schema';
import { UserUncheckedUpdateWithoutHandledTicketsInputObjectSchema as UserUncheckedUpdateWithoutHandledTicketsInputObjectSchema } from './UserUncheckedUpdateWithoutHandledTicketsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutHandledTicketsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutHandledTicketsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHandledTicketsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutHandledTicketsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutHandledTicketsInputObjectSchema), z.lazy(() => UserUpdateWithoutHandledTicketsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutHandledTicketsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutHandledTicketsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutHandledTicketsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutHandledTicketsNestedInput>;
export const UserUpdateOneWithoutHandledTicketsNestedInputObjectZodSchema = makeSchema();
