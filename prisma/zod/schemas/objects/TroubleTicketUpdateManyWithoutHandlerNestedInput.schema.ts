import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketCreateWithoutHandlerInputObjectSchema as TroubleTicketCreateWithoutHandlerInputObjectSchema } from './TroubleTicketCreateWithoutHandlerInput.schema';
import { TroubleTicketUncheckedCreateWithoutHandlerInputObjectSchema as TroubleTicketUncheckedCreateWithoutHandlerInputObjectSchema } from './TroubleTicketUncheckedCreateWithoutHandlerInput.schema';
import { TroubleTicketCreateOrConnectWithoutHandlerInputObjectSchema as TroubleTicketCreateOrConnectWithoutHandlerInputObjectSchema } from './TroubleTicketCreateOrConnectWithoutHandlerInput.schema';
import { TroubleTicketUpsertWithWhereUniqueWithoutHandlerInputObjectSchema as TroubleTicketUpsertWithWhereUniqueWithoutHandlerInputObjectSchema } from './TroubleTicketUpsertWithWhereUniqueWithoutHandlerInput.schema';
import { TroubleTicketCreateManyHandlerInputEnvelopeObjectSchema as TroubleTicketCreateManyHandlerInputEnvelopeObjectSchema } from './TroubleTicketCreateManyHandlerInputEnvelope.schema';
import { TroubleTicketWhereUniqueInputObjectSchema as TroubleTicketWhereUniqueInputObjectSchema } from './TroubleTicketWhereUniqueInput.schema';
import { TroubleTicketUpdateWithWhereUniqueWithoutHandlerInputObjectSchema as TroubleTicketUpdateWithWhereUniqueWithoutHandlerInputObjectSchema } from './TroubleTicketUpdateWithWhereUniqueWithoutHandlerInput.schema';
import { TroubleTicketUpdateManyWithWhereWithoutHandlerInputObjectSchema as TroubleTicketUpdateManyWithWhereWithoutHandlerInputObjectSchema } from './TroubleTicketUpdateManyWithWhereWithoutHandlerInput.schema';
import { TroubleTicketScalarWhereInputObjectSchema as TroubleTicketScalarWhereInputObjectSchema } from './TroubleTicketScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TroubleTicketCreateWithoutHandlerInputObjectSchema), z.lazy(() => TroubleTicketCreateWithoutHandlerInputObjectSchema).array(), z.lazy(() => TroubleTicketUncheckedCreateWithoutHandlerInputObjectSchema), z.lazy(() => TroubleTicketUncheckedCreateWithoutHandlerInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TroubleTicketCreateOrConnectWithoutHandlerInputObjectSchema), z.lazy(() => TroubleTicketCreateOrConnectWithoutHandlerInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => TroubleTicketUpsertWithWhereUniqueWithoutHandlerInputObjectSchema), z.lazy(() => TroubleTicketUpsertWithWhereUniqueWithoutHandlerInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TroubleTicketCreateManyHandlerInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema), z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema), z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema), z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema), z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => TroubleTicketUpdateWithWhereUniqueWithoutHandlerInputObjectSchema), z.lazy(() => TroubleTicketUpdateWithWhereUniqueWithoutHandlerInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => TroubleTicketUpdateManyWithWhereWithoutHandlerInputObjectSchema), z.lazy(() => TroubleTicketUpdateManyWithWhereWithoutHandlerInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => TroubleTicketScalarWhereInputObjectSchema), z.lazy(() => TroubleTicketScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const TroubleTicketUpdateManyWithoutHandlerNestedInputObjectSchema: z.ZodType<Prisma.TroubleTicketUpdateManyWithoutHandlerNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketUpdateManyWithoutHandlerNestedInput>;
export const TroubleTicketUpdateManyWithoutHandlerNestedInputObjectZodSchema = makeSchema();
