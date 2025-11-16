import * as z from 'zod';
import { TaskClassificationSchema } from '../../enums/TaskClassification.schema';
import { RequestTypeSchema } from '../../enums/RequestType.schema';
import { SpecificRequestTypeSchema } from '../../enums/SpecificRequestType.schema';
import { ZoneSchema } from '../../enums/Zone.schema';
import { PrioritySchema } from '../../enums/Priority.schema';
import { TicketStatusSchema } from '../../enums/TicketStatus.schema';
// prettier-ignore
export const TroubleTicketModelSchema = z.object({
    id: z.string(),
    serviceNumber: z.string(),
    tasksClassification: TaskClassificationSchema,
    requestType: RequestTypeSchema,
    specificRequestType: SpecificRequestTypeSchema,
    zone: ZoneSchema,
    remarks: z.string(),
    priority: PrioritySchema,
    status: TicketStatusSchema,
    pending_endAt: z.date().nullable(),
    resolvedAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    createdById: z.string().nullable(),
    createdBy: z.unknown().nullable(),
    handlerId: z.string().nullable(),
    handler: z.unknown().nullable()
}).strict();

export type TroubleTicketPureType = z.infer<typeof TroubleTicketModelSchema>;
