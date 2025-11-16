import * as z from 'zod';

export const TroubleTicketScalarFieldEnumSchema = z.enum(['id', 'serviceNumber', 'tasksClassification', 'requestType', 'specificRequestType', 'zone', 'remarks', 'priority', 'status', 'pending_endAt', 'resolvedAt', 'createdAt', 'updatedAt', 'createdById', 'handlerId'])

export type TroubleTicketScalarFieldEnum = z.infer<typeof TroubleTicketScalarFieldEnumSchema>;