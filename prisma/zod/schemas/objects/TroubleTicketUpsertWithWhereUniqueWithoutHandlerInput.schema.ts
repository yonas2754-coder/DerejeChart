import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketWhereUniqueInputObjectSchema as TroubleTicketWhereUniqueInputObjectSchema } from './TroubleTicketWhereUniqueInput.schema';
import { TroubleTicketUpdateWithoutHandlerInputObjectSchema as TroubleTicketUpdateWithoutHandlerInputObjectSchema } from './TroubleTicketUpdateWithoutHandlerInput.schema';
import { TroubleTicketUncheckedUpdateWithoutHandlerInputObjectSchema as TroubleTicketUncheckedUpdateWithoutHandlerInputObjectSchema } from './TroubleTicketUncheckedUpdateWithoutHandlerInput.schema';
import { TroubleTicketCreateWithoutHandlerInputObjectSchema as TroubleTicketCreateWithoutHandlerInputObjectSchema } from './TroubleTicketCreateWithoutHandlerInput.schema';
import { TroubleTicketUncheckedCreateWithoutHandlerInputObjectSchema as TroubleTicketUncheckedCreateWithoutHandlerInputObjectSchema } from './TroubleTicketUncheckedCreateWithoutHandlerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => TroubleTicketUpdateWithoutHandlerInputObjectSchema), z.lazy(() => TroubleTicketUncheckedUpdateWithoutHandlerInputObjectSchema)]),
  create: z.union([z.lazy(() => TroubleTicketCreateWithoutHandlerInputObjectSchema), z.lazy(() => TroubleTicketUncheckedCreateWithoutHandlerInputObjectSchema)])
}).strict();
export const TroubleTicketUpsertWithWhereUniqueWithoutHandlerInputObjectSchema: z.ZodType<Prisma.TroubleTicketUpsertWithWhereUniqueWithoutHandlerInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketUpsertWithWhereUniqueWithoutHandlerInput>;
export const TroubleTicketUpsertWithWhereUniqueWithoutHandlerInputObjectZodSchema = makeSchema();
