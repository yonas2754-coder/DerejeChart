import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutCreatedTicketsInputObjectSchema as UserUpdateWithoutCreatedTicketsInputObjectSchema } from './UserUpdateWithoutCreatedTicketsInput.schema';
import { UserUncheckedUpdateWithoutCreatedTicketsInputObjectSchema as UserUncheckedUpdateWithoutCreatedTicketsInputObjectSchema } from './UserUncheckedUpdateWithoutCreatedTicketsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutCreatedTicketsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCreatedTicketsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutCreatedTicketsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCreatedTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCreatedTicketsInput>;
export const UserUpdateToOneWithWhereWithoutCreatedTicketsInputObjectZodSchema = makeSchema();
