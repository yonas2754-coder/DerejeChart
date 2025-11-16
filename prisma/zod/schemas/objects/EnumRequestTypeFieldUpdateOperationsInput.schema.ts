import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RequestTypeSchema } from '../enums/RequestType.schema'

const makeSchema = () => z.object({
  set: RequestTypeSchema.optional()
}).strict();
export const EnumRequestTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumRequestTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumRequestTypeFieldUpdateOperationsInput>;
export const EnumRequestTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
