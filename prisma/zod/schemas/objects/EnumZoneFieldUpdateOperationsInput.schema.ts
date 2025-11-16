import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ZoneSchema } from '../enums/Zone.schema'

const makeSchema = () => z.object({
  set: ZoneSchema.optional()
}).strict();
export const EnumZoneFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumZoneFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumZoneFieldUpdateOperationsInput>;
export const EnumZoneFieldUpdateOperationsInputObjectZodSchema = makeSchema();
