import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketCreateWithoutCreatedByInputObjectSchema as TroubleTicketCreateWithoutCreatedByInputObjectSchema } from './TroubleTicketCreateWithoutCreatedByInput.schema';
import { TroubleTicketUncheckedCreateWithoutCreatedByInputObjectSchema as TroubleTicketUncheckedCreateWithoutCreatedByInputObjectSchema } from './TroubleTicketUncheckedCreateWithoutCreatedByInput.schema';
import { TroubleTicketCreateOrConnectWithoutCreatedByInputObjectSchema as TroubleTicketCreateOrConnectWithoutCreatedByInputObjectSchema } from './TroubleTicketCreateOrConnectWithoutCreatedByInput.schema';
import { TroubleTicketUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema as TroubleTicketUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema } from './TroubleTicketUpsertWithWhereUniqueWithoutCreatedByInput.schema';
import { TroubleTicketCreateManyCreatedByInputEnvelopeObjectSchema as TroubleTicketCreateManyCreatedByInputEnvelopeObjectSchema } from './TroubleTicketCreateManyCreatedByInputEnvelope.schema';
import { TroubleTicketWhereUniqueInputObjectSchema as TroubleTicketWhereUniqueInputObjectSchema } from './TroubleTicketWhereUniqueInput.schema';
import { TroubleTicketUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema as TroubleTicketUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema } from './TroubleTicketUpdateWithWhereUniqueWithoutCreatedByInput.schema';
import { TroubleTicketUpdateManyWithWhereWithoutCreatedByInputObjectSchema as TroubleTicketUpdateManyWithWhereWithoutCreatedByInputObjectSchema } from './TroubleTicketUpdateManyWithWhereWithoutCreatedByInput.schema';
import { TroubleTicketScalarWhereInputObjectSchema as TroubleTicketScalarWhereInputObjectSchema } from './TroubleTicketScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TroubleTicketCreateWithoutCreatedByInputObjectSchema), z.lazy(() => TroubleTicketCreateWithoutCreatedByInputObjectSchema).array(), z.lazy(() => TroubleTicketUncheckedCreateWithoutCreatedByInputObjectSchema), z.lazy(() => TroubleTicketUncheckedCreateWithoutCreatedByInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TroubleTicketCreateOrConnectWithoutCreatedByInputObjectSchema), z.lazy(() => TroubleTicketCreateOrConnectWithoutCreatedByInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => TroubleTicketUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema), z.lazy(() => TroubleTicketUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TroubleTicketCreateManyCreatedByInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema), z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema), z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema), z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema), z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => TroubleTicketUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema), z.lazy(() => TroubleTicketUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => TroubleTicketUpdateManyWithWhereWithoutCreatedByInputObjectSchema), z.lazy(() => TroubleTicketUpdateManyWithWhereWithoutCreatedByInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => TroubleTicketScalarWhereInputObjectSchema), z.lazy(() => TroubleTicketScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const TroubleTicketUncheckedUpdateManyWithoutCreatedByNestedInputObjectSchema: z.ZodType<Prisma.TroubleTicketUncheckedUpdateManyWithoutCreatedByNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketUncheckedUpdateManyWithoutCreatedByNestedInput>;
export const TroubleTicketUncheckedUpdateManyWithoutCreatedByNestedInputObjectZodSchema = makeSchema();
