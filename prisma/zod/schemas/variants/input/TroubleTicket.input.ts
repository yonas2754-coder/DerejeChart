import * as z from 'zod';
import { TaskClassificationSchema } from '../../enums/TaskClassification.schema';
import { RequestTypeSchema } from '../../enums/RequestType.schema';
import { SpecificRequestTypeSchema } from '../../enums/SpecificRequestType.schema';
import { ZoneSchema } from '../../enums/Zone.schema';
import { PrioritySchema } from '../../enums/Priority.schema';
import { TicketStatusSchema } from '../../enums/TicketStatus.schema';
// prettier-ignore
export const TroubleTicketInputSchema = z.object({
    id: z.string(),
    serviceNumber: z.string(),
    tasksClassification: TaskClassificationSchema,
    requestType: RequestTypeSchema,
    specificRequestType: SpecificRequestTypeSchema,
    zone: ZoneSchema,
    remarks: z.string(),
    priority: PrioritySchema,
    status: TicketStatusSchema,
    pending_endAt: z.date().optional().nullable(),
    resolvedAt: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    createdById: z.string().optional().nullable(),
    createdBy: z.unknown().optional().nullable(),
    handlerId: z.string().optional().nullable(),
    handler: z.unknown().optional().nullable()
}).strict();

export type TroubleTicketInputType = z.infer<typeof TroubleTicketInputSchema>;
