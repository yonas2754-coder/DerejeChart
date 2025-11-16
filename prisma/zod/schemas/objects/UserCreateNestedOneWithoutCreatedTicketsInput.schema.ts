import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCreatedTicketsInputObjectSchema as UserCreateWithoutCreatedTicketsInputObjectSchema } from './UserCreateWithoutCreatedTicketsInput.schema';
import { UserUncheckedCreateWithoutCreatedTicketsInputObjectSchema as UserUncheckedCreateWithoutCreatedTicketsInputObjectSchema } from './UserUncheckedCreateWithoutCreatedTicketsInput.schema';
import { UserCreateOrConnectWithoutCreatedTicketsInputObjectSchema as UserCreateOrConnectWithoutCreatedTicketsInputObjectSchema } from './UserCreateOrConnectWithoutCreatedTicketsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCreatedTicketsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCreatedTicketsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedTicketsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutCreatedTicketsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCreatedTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutCreatedTicketsInput>;
export const UserCreateNestedOneWithoutCreatedTicketsInputObjectZodSchema = makeSchema();
