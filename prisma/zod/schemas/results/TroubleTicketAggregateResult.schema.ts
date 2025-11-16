import * as z from 'zod';
export const TroubleTicketAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    serviceNumber: z.number(),
    tasksClassification: z.number(),
    requestType: z.number(),
    specificRequestType: z.number(),
    zone: z.number(),
    remarks: z.number(),
    priority: z.number(),
    status: z.number(),
    pending_endAt: z.number(),
    resolvedAt: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    createdById: z.number(),
    createdBy: z.number(),
    handlerId: z.number(),
    handler: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    serviceNumber: z.string().nullable(),
    remarks: z.string().nullable(),
    pending_endAt: z.date().nullable(),
    resolvedAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    createdById: z.string().nullable(),
    handlerId: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    serviceNumber: z.string().nullable(),
    remarks: z.string().nullable(),
    pending_endAt: z.date().nullable(),
    resolvedAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    createdById: z.string().nullable(),
    handlerId: z.string().nullable()
  }).nullable().optional()});