import * as z from 'zod';
export const TroubleTicketFindFirstResultSchema = z.nullable(z.object({
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
}));