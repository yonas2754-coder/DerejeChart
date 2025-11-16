import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketCreateWithoutHandlerInputObjectSchema as TroubleTicketCreateWithoutHandlerInputObjectSchema } from './TroubleTicketCreateWithoutHandlerInput.schema';
import { TroubleTicketUncheckedCreateWithoutHandlerInputObjectSchema as TroubleTicketUncheckedCreateWithoutHandlerInputObjectSchema } from './TroubleTicketUncheckedCreateWithoutHandlerInput.schema';
import { TroubleTicketCreateOrConnectWithoutHandlerInputObjectSchema as TroubleTicketCreateOrConnectWithoutHandlerInputObjectSchema } from './TroubleTicketCreateOrConnectWithoutHandlerInput.schema';
import { TroubleTicketCreateManyHandlerInputEnvelopeObjectSchema as TroubleTicketCreateManyHandlerInputEnvelopeObjectSchema } from './TroubleTicketCreateManyHandlerInputEnvelope.schema';
import { TroubleTicketWhereUniqueInputObjectSchema as TroubleTicketWhereUniqueInputObjectSchema } from './TroubleTicketWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TroubleTicketCreateWithoutHandlerInputObjectSchema), z.lazy(() => TroubleTicketCreateWithoutHandlerInputObjectSchema).array(), z.lazy(() => TroubleTicketUncheckedCreateWithoutHandlerInputObjectSchema), z.lazy(() => TroubleTicketUncheckedCreateWithoutHandlerInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TroubleTicketCreateOrConnectWithoutHandlerInputObjectSchema), z.lazy(() => TroubleTicketCreateOrConnectWithoutHandlerInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TroubleTicketCreateManyHandlerInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema), z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const TroubleTicketCreateNestedManyWithoutHandlerInputObjectSchema: z.ZodType<Prisma.TroubleTicketCreateNestedManyWithoutHandlerInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketCreateNestedManyWithoutHandlerInput>;
export const TroubleTicketCreateNestedManyWithoutHandlerInputObjectZodSchema = makeSchema();
