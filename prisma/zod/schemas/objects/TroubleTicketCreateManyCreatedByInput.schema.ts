import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskClassificationSchema } from '../enums/TaskClassification.schema';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { SpecificRequestTypeSchema } from '../enums/SpecificRequestType.schema';
import { ZoneSchema } from '../enums/Zone.schema';
import { PrioritySchema } from '../enums/Priority.schema';
import { TicketStatusSchema } from '../enums/TicketStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  serviceNumber: z.string(),
  tasksClassification: TaskClassificationSchema,
  requestType: RequestTypeSchema,
  specificRequestType: SpecificRequestTypeSchema,
  zone: ZoneSchema,
  remarks: z.string(),
  priority: PrioritySchema,
  status: TicketStatusSchema.optional(),
  pending_endAt: z.coerce.date().optional().nullable(),
  resolvedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  handlerId: z.string().optional().nullable()
}).strict();
export const TroubleTicketCreateManyCreatedByInputObjectSchema: z.ZodType<Prisma.TroubleTicketCreateManyCreatedByInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketCreateManyCreatedByInput>;
export const TroubleTicketCreateManyCreatedByInputObjectZodSchema = makeSchema();
