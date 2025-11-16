import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TicketStatusSchema } from '../enums/TicketStatus.schema'

const makeSchema = () => z.object({
  set: TicketStatusSchema.optional()
}).strict();
export const EnumTicketStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumTicketStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumTicketStatusFieldUpdateOperationsInput>;
export const EnumTicketStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
