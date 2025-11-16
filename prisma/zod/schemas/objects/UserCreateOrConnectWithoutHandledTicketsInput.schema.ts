import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutHandledTicketsInputObjectSchema as UserCreateWithoutHandledTicketsInputObjectSchema } from './UserCreateWithoutHandledTicketsInput.schema';
import { UserUncheckedCreateWithoutHandledTicketsInputObjectSchema as UserUncheckedCreateWithoutHandledTicketsInputObjectSchema } from './UserUncheckedCreateWithoutHandledTicketsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutHandledTicketsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutHandledTicketsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutHandledTicketsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutHandledTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutHandledTicketsInput>;
export const UserCreateOrConnectWithoutHandledTicketsInputObjectZodSchema = makeSchema();
