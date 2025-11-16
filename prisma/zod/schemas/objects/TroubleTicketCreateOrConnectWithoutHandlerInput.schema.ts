import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketWhereUniqueInputObjectSchema as TroubleTicketWhereUniqueInputObjectSchema } from './TroubleTicketWhereUniqueInput.schema';
import { TroubleTicketCreateWithoutHandlerInputObjectSchema as TroubleTicketCreateWithoutHandlerInputObjectSchema } from './TroubleTicketCreateWithoutHandlerInput.schema';
import { TroubleTicketUncheckedCreateWithoutHandlerInputObjectSchema as TroubleTicketUncheckedCreateWithoutHandlerInputObjectSchema } from './TroubleTicketUncheckedCreateWithoutHandlerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => TroubleTicketCreateWithoutHandlerInputObjectSchema), z.lazy(() => TroubleTicketUncheckedCreateWithoutHandlerInputObjectSchema)])
}).strict();
export const TroubleTicketCreateOrConnectWithoutHandlerInputObjectSchema: z.ZodType<Prisma.TroubleTicketCreateOrConnectWithoutHandlerInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketCreateOrConnectWithoutHandlerInput>;
export const TroubleTicketCreateOrConnectWithoutHandlerInputObjectZodSchema = makeSchema();
