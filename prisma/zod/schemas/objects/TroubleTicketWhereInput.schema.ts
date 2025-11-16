import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumTaskClassificationFilterObjectSchema as EnumTaskClassificationFilterObjectSchema } from './EnumTaskClassificationFilter.schema';
import { TaskClassificationSchema } from '../enums/TaskClassification.schema';
import { EnumRequestTypeFilterObjectSchema as EnumRequestTypeFilterObjectSchema } from './EnumRequestTypeFilter.schema';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { EnumSpecificRequestTypeFilterObjectSchema as EnumSpecificRequestTypeFilterObjectSchema } from './EnumSpecificRequestTypeFilter.schema';
import { SpecificRequestTypeSchema } from '../enums/SpecificRequestType.schema';
import { EnumZoneFilterObjectSchema as EnumZoneFilterObjectSchema } from './EnumZoneFilter.schema';
import { ZoneSchema } from '../enums/Zone.schema';
import { EnumPriorityFilterObjectSchema as EnumPriorityFilterObjectSchema } from './EnumPriorityFilter.schema';
import { PrioritySchema } from '../enums/Priority.schema';
import { EnumTicketStatusFilterObjectSchema as EnumTicketStatusFilterObjectSchema } from './EnumTicketStatusFilter.schema';
import { TicketStatusSchema } from '../enums/TicketStatus.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { UserNullableScalarRelationFilterObjectSchema as UserNullableScalarRelationFilterObjectSchema } from './UserNullableScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const troubleticketwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => TroubleTicketWhereInputObjectSchema), z.lazy(() => TroubleTicketWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => TroubleTicketWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => TroubleTicketWhereInputObjectSchema), z.lazy(() => TroubleTicketWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  serviceNumber: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  tasksClassification: z.union([z.lazy(() => EnumTaskClassificationFilterObjectSchema), TaskClassificationSchema]).optional(),
  requestType: z.union([z.lazy(() => EnumRequestTypeFilterObjectSchema), RequestTypeSchema]).optional(),
  specificRequestType: z.union([z.lazy(() => EnumSpecificRequestTypeFilterObjectSchema), SpecificRequestTypeSchema]).optional(),
  zone: z.union([z.lazy(() => EnumZoneFilterObjectSchema), ZoneSchema]).optional(),
  remarks: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  priority: z.union([z.lazy(() => EnumPriorityFilterObjectSchema), PrioritySchema]).optional(),
  status: z.union([z.lazy(() => EnumTicketStatusFilterObjectSchema), TicketStatusSchema]).optional(),
  pending_endAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  resolvedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdById: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  handlerId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdBy: z.union([z.lazy(() => UserNullableScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  handler: z.union([z.lazy(() => UserNullableScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const TroubleTicketWhereInputObjectSchema: z.ZodType<Prisma.TroubleTicketWhereInput> = troubleticketwhereinputSchema as unknown as z.ZodType<Prisma.TroubleTicketWhereInput>;
export const TroubleTicketWhereInputObjectZodSchema = troubleticketwhereinputSchema;
