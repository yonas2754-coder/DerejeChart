import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketScalarWhereInputObjectSchema as TroubleTicketScalarWhereInputObjectSchema } from './TroubleTicketScalarWhereInput.schema';
import { TroubleTicketUpdateManyMutationInputObjectSchema as TroubleTicketUpdateManyMutationInputObjectSchema } from './TroubleTicketUpdateManyMutationInput.schema';
import { TroubleTicketUncheckedUpdateManyWithoutCreatedByInputObjectSchema as TroubleTicketUncheckedUpdateManyWithoutCreatedByInputObjectSchema } from './TroubleTicketUncheckedUpdateManyWithoutCreatedByInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TroubleTicketScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => TroubleTicketUpdateManyMutationInputObjectSchema), z.lazy(() => TroubleTicketUncheckedUpdateManyWithoutCreatedByInputObjectSchema)])
}).strict();
export const TroubleTicketUpdateManyWithWhereWithoutCreatedByInputObjectSchema: z.ZodType<Prisma.TroubleTicketUpdateManyWithWhereWithoutCreatedByInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketUpdateManyWithWhereWithoutCreatedByInput>;
export const TroubleTicketUpdateManyWithWhereWithoutCreatedByInputObjectZodSchema = makeSchema();
