import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SpecificRequestTypeSchema } from '../enums/SpecificRequestType.schema'

const makeSchema = () => z.object({
  set: SpecificRequestTypeSchema.optional()
}).strict();
export const EnumSpecificRequestTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumSpecificRequestTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumSpecificRequestTypeFieldUpdateOperationsInput>;
export const EnumSpecificRequestTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
