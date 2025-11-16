import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { TaskClassificationSchema } from '../enums/TaskClassification.schema';
import { EnumTaskClassificationFieldUpdateOperationsInputObjectSchema as EnumTaskClassificationFieldUpdateOperationsInputObjectSchema } from './EnumTaskClassificationFieldUpdateOperationsInput.schema';
import { RequestTypeSchema } from '../enums/RequestType.schema';
import { EnumRequestTypeFieldUpdateOperationsInputObjectSchema as EnumRequestTypeFieldUpdateOperationsInputObjectSchema } from './EnumRequestTypeFieldUpdateOperationsInput.schema';
import { SpecificRequestTypeSchema } from '../enums/SpecificRequestType.schema';
import { EnumSpecificRequestTypeFieldUpdateOperationsInputObjectSchema as EnumSpecificRequestTypeFieldUpdateOperationsInputObjectSchema } from './EnumSpecificRequestTypeFieldUpdateOperationsInput.schema';
import { ZoneSchema } from '../enums/Zone.schema';
import { EnumZoneFieldUpdateOperationsInputObjectSchema as EnumZoneFieldUpdateOperationsInputObjectSchema } from './EnumZoneFieldUpdateOperationsInput.schema';
import { PrioritySchema } from '../enums/Priority.schema';
import { EnumPriorityFieldUpdateOperationsInputObjectSchema as EnumPriorityFieldUpdateOperationsInputObjectSchema } from './EnumPriorityFieldUpdateOperationsInput.schema';
import { TicketStatusSchema } from '../enums/TicketStatus.schema';
import { EnumTicketStatusFieldUpdateOperationsInputObjectSchema as EnumTicketStatusFieldUpdateOperationsInputObjectSchema } from './EnumTicketStatusFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  serviceNumber: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  tasksClassification: z.union([TaskClassificationSchema, z.lazy(() => EnumTaskClassificationFieldUpdateOperationsInputObjectSchema)]).optional(),
  requestType: z.union([RequestTypeSchema, z.lazy(() => EnumRequestTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  specificRequestType: z.union([SpecificRequestTypeSchema, z.lazy(() => EnumSpecificRequestTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  zone: z.union([ZoneSchema, z.lazy(() => EnumZoneFieldUpdateOperationsInputObjectSchema)]).optional(),
  remarks: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  priority: z.union([PrioritySchema, z.lazy(() => EnumPriorityFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([TicketStatusSchema, z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  pending_endAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  handlerId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable()
}).strict();
export const TroubleTicketUncheckedUpdateWithoutCreatedByInputObjectSchema: z.ZodType<Prisma.TroubleTicketUncheckedUpdateWithoutCreatedByInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketUncheckedUpdateWithoutCreatedByInput>;
export const TroubleTicketUncheckedUpdateWithoutCreatedByInputObjectZodSchema = makeSchema();
