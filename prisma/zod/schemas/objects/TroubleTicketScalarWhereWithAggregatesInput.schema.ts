import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumTaskClassificationWithAggregatesFilterObjectSchema as EnumTaskClassificationWithAggregatesFilterObjectSchema } from './EnumTaskClassificationWithAggregatesFilter.schema';
import { TaskClassificationSchema } from '../enums/TaskClassification.schema';
import { EnumRequestTypeWithAggregatesFilterObjectSchema as EnumRequestTypeWithAggregatesFilterObjectSchema } from './EnumRequestTypeWithAggregatesFilter.schema';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { EnumSpecificRequestTypeWithAggregatesFilterObjectSchema as EnumSpecificRequestTypeWithAggregatesFilterObjectSchema } from './EnumSpecificRequestTypeWithAggregatesFilter.schema';
import { SpecificRequestTypeSchema } from '../enums/SpecificRequestType.schema';
import { EnumZoneWithAggregatesFilterObjectSchema as EnumZoneWithAggregatesFilterObjectSchema } from './EnumZoneWithAggregatesFilter.schema';
import { ZoneSchema } from '../enums/Zone.schema';
import { EnumPriorityWithAggregatesFilterObjectSchema as EnumPriorityWithAggregatesFilterObjectSchema } from './EnumPriorityWithAggregatesFilter.schema';
import { PrioritySchema } from '../enums/Priority.schema';
import { EnumTicketStatusWithAggregatesFilterObjectSchema as EnumTicketStatusWithAggregatesFilterObjectSchema } from './EnumTicketStatusWithAggregatesFilter.schema';
import { TicketStatusSchema } from '../enums/TicketStatus.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema'

const troubleticketscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => TroubleTicketScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => TroubleTicketScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => TroubleTicketScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => TroubleTicketScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => TroubleTicketScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  serviceNumber: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  tasksClassification: z.union([z.lazy(() => EnumTaskClassificationWithAggregatesFilterObjectSchema), TaskClassificationSchema]).optional(),
  requestType: z.union([z.lazy(() => EnumRequestTypeWithAggregatesFilterObjectSchema), RequestTypeSchema]).optional(),
  specificRequestType: z.union([z.lazy(() => EnumSpecificRequestTypeWithAggregatesFilterObjectSchema), SpecificRequestTypeSchema]).optional(),
  zone: z.union([z.lazy(() => EnumZoneWithAggregatesFilterObjectSchema), ZoneSchema]).optional(),
  remarks: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  priority: z.union([z.lazy(() => EnumPriorityWithAggregatesFilterObjectSchema), PrioritySchema]).optional(),
  status: z.union([z.lazy(() => EnumTicketStatusWithAggregatesFilterObjectSchema), TicketStatusSchema]).optional(),
  pending_endAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  resolvedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  createdById: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  handlerId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable()
}).strict();
export const TroubleTicketScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.TroubleTicketScalarWhereWithAggregatesInput> = troubleticketscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.TroubleTicketScalarWhereWithAggregatesInput>;
export const TroubleTicketScalarWhereWithAggregatesInputObjectZodSchema = troubleticketscalarwherewithaggregatesinputSchema;
