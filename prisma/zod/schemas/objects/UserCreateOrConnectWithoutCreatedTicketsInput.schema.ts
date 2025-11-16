import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutCreatedTicketsInputObjectSchema as UserCreateWithoutCreatedTicketsInputObjectSchema } from './UserCreateWithoutCreatedTicketsInput.schema';
import { UserUncheckedCreateWithoutCreatedTicketsInputObjectSchema as UserUncheckedCreateWithoutCreatedTicketsInputObjectSchema } from './UserUncheckedCreateWithoutCreatedTicketsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCreatedTicketsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCreatedTicketsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutCreatedTicketsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCreatedTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutCreatedTicketsInput>;
export const UserCreateOrConnectWithoutCreatedTicketsInputObjectZodSchema = makeSchema();
