import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutHandledTicketsInputObjectSchema as UserUpdateWithoutHandledTicketsInputObjectSchema } from './UserUpdateWithoutHandledTicketsInput.schema';
import { UserUncheckedUpdateWithoutHandledTicketsInputObjectSchema as UserUncheckedUpdateWithoutHandledTicketsInputObjectSchema } from './UserUncheckedUpdateWithoutHandledTicketsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutHandledTicketsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutHandledTicketsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutHandledTicketsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutHandledTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutHandledTicketsInput>;
export const UserUpdateToOneWithWhereWithoutHandledTicketsInputObjectZodSchema = makeSchema();
