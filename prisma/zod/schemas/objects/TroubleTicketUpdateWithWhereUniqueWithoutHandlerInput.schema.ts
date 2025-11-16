import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketWhereUniqueInputObjectSchema as TroubleTicketWhereUniqueInputObjectSchema } from './TroubleTicketWhereUniqueInput.schema';
import { TroubleTicketUpdateWithoutHandlerInputObjectSchema as TroubleTicketUpdateWithoutHandlerInputObjectSchema } from './TroubleTicketUpdateWithoutHandlerInput.schema';
import { TroubleTicketUncheckedUpdateWithoutHandlerInputObjectSchema as TroubleTicketUncheckedUpdateWithoutHandlerInputObjectSchema } from './TroubleTicketUncheckedUpdateWithoutHandlerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => TroubleTicketUpdateWithoutHandlerInputObjectSchema), z.lazy(() => TroubleTicketUncheckedUpdateWithoutHandlerInputObjectSchema)])
}).strict();
export const TroubleTicketUpdateWithWhereUniqueWithoutHandlerInputObjectSchema: z.ZodType<Prisma.TroubleTicketUpdateWithWhereUniqueWithoutHandlerInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketUpdateWithWhereUniqueWithoutHandlerInput>;
export const TroubleTicketUpdateWithWhereUniqueWithoutHandlerInputObjectZodSchema = makeSchema();
