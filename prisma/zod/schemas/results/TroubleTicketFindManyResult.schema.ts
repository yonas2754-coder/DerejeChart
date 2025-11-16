import * as z from 'zod';
export const TroubleTicketFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  serviceNumber: z.string(),
  tasksClassification: z.unknown(),
  requestType: z.unknown(),
  specificRequestType: z.unknown(),
  zone: z.unknown(),
  remarks: z.string(),
  priority: z.unknown(),
  status: z.unknown(),
  pending_endAt: z.date().optional(),
  resolvedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdById: z.string().optional(),
  createdBy: z.unknown().optional(),
  handlerId: z.string().optional(),
  handler: z.unknown().optional()
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