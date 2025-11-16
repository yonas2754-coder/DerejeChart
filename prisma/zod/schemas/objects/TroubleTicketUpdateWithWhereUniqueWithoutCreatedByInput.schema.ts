import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketWhereUniqueInputObjectSchema as TroubleTicketWhereUniqueInputObjectSchema } from './TroubleTicketWhereUniqueInput.schema';
import { TroubleTicketUpdateWithoutCreatedByInputObjectSchema as TroubleTicketUpdateWithoutCreatedByInputObjectSchema } from './TroubleTicketUpdateWithoutCreatedByInput.schema';
import { TroubleTicketUncheckedUpdateWithoutCreatedByInputObjectSchema as TroubleTicketUncheckedUpdateWithoutCreatedByInputObjectSchema } from './TroubleTicketUncheckedUpdateWithoutCreatedByInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => TroubleTicketUpdateWithoutCreatedByInputObjectSchema), z.lazy(() => TroubleTicketUncheckedUpdateWithoutCreatedByInputObjectSchema)])
}).strict();
export const TroubleTicketUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema: z.ZodType<Prisma.TroubleTicketUpdateWithWhereUniqueWithoutCreatedByInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketUpdateWithWhereUniqueWithoutCreatedByInput>;
export const TroubleTicketUpdateWithWhereUniqueWithoutCreatedByInputObjectZodSchema = makeSchema();
