import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskClassificationSchema } from '../enums/TaskClassification.schema'

const makeSchema = () => z.object({
  set: TaskClassificationSchema.optional()
}).strict();
export const EnumTaskClassificationFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumTaskClassificationFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumTaskClassificationFieldUpdateOperationsInput>;
export const EnumTaskClassificationFieldUpdateOperationsInputObjectZodSchema = makeSchema();
