import * as z from 'zod';
export const UserFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string(),
  password: z.string(),
  image: z.string().optional(),
  role: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdTickets: z.array(z.unknown()),
  handledTickets: z.array(z.unknown())
}));