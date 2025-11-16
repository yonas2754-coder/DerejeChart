import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketCreateManyCreatedByInputObjectSchema as TroubleTicketCreateManyCreatedByInputObjectSchema } from './TroubleTicketCreateManyCreatedByInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => TroubleTicketCreateManyCreatedByInputObjectSchema), z.lazy(() => TroubleTicketCreateManyCreatedByInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const TroubleTicketCreateManyCreatedByInputEnvelopeObjectSchema: z.ZodType<Prisma.TroubleTicketCreateManyCreatedByInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketCreateManyCreatedByInputEnvelope>;
export const TroubleTicketCreateManyCreatedByInputEnvelopeObjectZodSchema = makeSchema();
