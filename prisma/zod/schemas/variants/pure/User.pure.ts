import * as z from 'zod';
import { RoleSchema } from '../../enums/Role.schema';
// prettier-ignore
export const UserModelSchema = z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string(),
    password: z.string(),
    image: z.string().nullable(),
    role: RoleSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
    createdTickets: z.array(z.unknown()),
    handledTickets: z.array(z.unknown())
}).strict();

export type UserPureType = z.infer<typeof UserModelSchema>;
