import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutHandledTicketsInputObjectSchema as UserCreateWithoutHandledTicketsInputObjectSchema } from './UserCreateWithoutHandledTicketsInput.schema';
import { UserUncheckedCreateWithoutHandledTicketsInputObjectSchema as UserUncheckedCreateWithoutHandledTicketsInputObjectSchema } from './UserUncheckedCreateWithoutHandledTicketsInput.schema';
import { UserCreateOrConnectWithoutHandledTicketsInputObjectSchema as UserCreateOrConnectWithoutHandledTicketsInputObjectSchema } from './UserCreateOrConnectWithoutHandledTicketsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutHandledTicketsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutHandledTicketsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHandledTicketsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutHandledTicketsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutHandledTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutHandledTicketsInput>;
export const UserCreateNestedOneWithoutHandledTicketsInputObjectZodSchema = makeSchema();
