import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCreatedTicketsInputObjectSchema as UserCreateWithoutCreatedTicketsInputObjectSchema } from './UserCreateWithoutCreatedTicketsInput.schema';
import { UserUncheckedCreateWithoutCreatedTicketsInputObjectSchema as UserUncheckedCreateWithoutCreatedTicketsInputObjectSchema } from './UserUncheckedCreateWithoutCreatedTicketsInput.schema';
import { UserCreateOrConnectWithoutCreatedTicketsInputObjectSchema as UserCreateOrConnectWithoutCreatedTicketsInputObjectSchema } from './UserCreateOrConnectWithoutCreatedTicketsInput.schema';
import { UserUpsertWithoutCreatedTicketsInputObjectSchema as UserUpsertWithoutCreatedTicketsInputObjectSchema } from './UserUpsertWithoutCreatedTicketsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutCreatedTicketsInputObjectSchema as UserUpdateToOneWithWhereWithoutCreatedTicketsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutCreatedTicketsInput.schema';
import { UserUpdateWithoutCreatedTicketsInputObjectSchema as UserUpdateWithoutCreatedTicketsInputObjectSchema } from './UserUpdateWithoutCreatedTicketsInput.schema';
import { UserUncheckedUpdateWithoutCreatedTicketsInputObjectSchema as UserUncheckedUpdateWithoutCreatedTicketsInputObjectSchema } from './UserUncheckedUpdateWithoutCreatedTicketsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCreatedTicketsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCreatedTicketsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedTicketsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCreatedTicketsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutCreatedTicketsInputObjectSchema), z.lazy(() => UserUpdateWithoutCreatedTicketsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCreatedTicketsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutCreatedTicketsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutCreatedTicketsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutCreatedTicketsNestedInput>;
export const UserUpdateOneWithoutCreatedTicketsNestedInputObjectZodSchema = makeSchema();
