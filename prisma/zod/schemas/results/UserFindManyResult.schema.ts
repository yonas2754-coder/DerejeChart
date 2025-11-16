import * as z from 'zod';
export const UserFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});