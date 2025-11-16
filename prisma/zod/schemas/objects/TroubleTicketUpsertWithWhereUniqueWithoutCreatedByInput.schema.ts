import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketWhereUniqueInputObjectSchema as TroubleTicketWhereUniqueInputObjectSchema } from './TroubleTicketWhereUniqueInput.schema';
import { TroubleTicketUpdateWithoutCreatedByInputObjectSchema as TroubleTicketUpdateWithoutCreatedByInputObjectSchema } from './TroubleTicketUpdateWithoutCreatedByInput.schema';
import { TroubleTicketUncheckedUpdateWithoutCreatedByInputObjectSchema as TroubleTicketUncheckedUpdateWithoutCreatedByInputObjectSchema } from './TroubleTicketUncheckedUpdateWithoutCreatedByInput.schema';
import { TroubleTicketCreateWithoutCreatedByInputObjectSchema as TroubleTicketCreateWithoutCreatedByInputObjectSchema } from './TroubleTicketCreateWithoutCreatedByInput.schema';
import { TroubleTicketUncheckedCreateWithoutCreatedByInputObjectSchema as TroubleTicketUncheckedCreateWithoutCreatedByInputObjectSchema } from './TroubleTicketUncheckedCreateWithoutCreatedByInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => TroubleTicketUpdateWithoutCreatedByInputObjectSchema), z.lazy(() => TroubleTicketUncheckedUpdateWithoutCreatedByInputObjectSchema)]),
  create: z.union([z.lazy(() => TroubleTicketCreateWithoutCreatedByInputObjectSchema), z.lazy(() => TroubleTicketUncheckedCreateWithoutCreatedByInputObjectSchema)])
}).strict();
export const TroubleTicketUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema: z.ZodType<Prisma.TroubleTicketUpsertWithWhereUniqueWithoutCreatedByInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketUpsertWithWhereUniqueWithoutCreatedByInput>;
export const TroubleTicketUpsertWithWhereUniqueWithoutCreatedByInputObjectZodSchema = makeSchema();
