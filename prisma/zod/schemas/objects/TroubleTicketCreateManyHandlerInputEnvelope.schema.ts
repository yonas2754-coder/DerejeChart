import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketCreateManyHandlerInputObjectSchema as TroubleTicketCreateManyHandlerInputObjectSchema } from './TroubleTicketCreateManyHandlerInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => TroubleTicketCreateManyHandlerInputObjectSchema), z.lazy(() => TroubleTicketCreateManyHandlerInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const TroubleTicketCreateManyHandlerInputEnvelopeObjectSchema: z.ZodType<Prisma.TroubleTicketCreateManyHandlerInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketCreateManyHandlerInputEnvelope>;
export const TroubleTicketCreateManyHandlerInputEnvelopeObjectZodSchema = makeSchema();
