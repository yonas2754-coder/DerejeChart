import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PrioritySchema } from '../enums/Priority.schema'

const makeSchema = () => z.object({
  set: PrioritySchema.optional()
}).strict();
export const EnumPriorityFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumPriorityFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumPriorityFieldUpdateOperationsInput>;
export const EnumPriorityFieldUpdateOperationsInputObjectZodSchema = makeSchema();
