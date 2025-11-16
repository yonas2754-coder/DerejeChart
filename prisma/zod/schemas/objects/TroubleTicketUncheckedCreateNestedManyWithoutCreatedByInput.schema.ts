import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketCreateWithoutCreatedByInputObjectSchema as TroubleTicketCreateWithoutCreatedByInputObjectSchema } from './TroubleTicketCreateWithoutCreatedByInput.schema';
import { TroubleTicketUncheckedCreateWithoutCreatedByInputObjectSchema as TroubleTicketUncheckedCreateWithoutCreatedByInputObjectSchema } from './TroubleTicketUncheckedCreateWithoutCreatedByInput.schema';
import { TroubleTicketCreateOrConnectWithoutCreatedByInputObjectSchema as TroubleTicketCreateOrConnectWithoutCreatedByInputObjectSchema } from './TroubleTicketCreateOrConnectWithoutCreatedByInput.schema';
import { TroubleTicketCreateManyCreatedByInputEnvelopeObjectSchema as TroubleTicketCreateManyCreatedByInputEnvelopeObjectSchema } from './TroubleTicketCreateManyCreatedByInputEnvelope.schema';
import { TroubleTicketWhereUniqueInputObjectSchema as TroubleTicketWhereUniqueInputObjectSchema } from './TroubleTicketWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TroubleTicketCreateWithoutCreatedByInputObjectSchema), z.lazy(() => TroubleTicketCreateWithoutCreatedByInputObjectSchema).array(), z.lazy(() => TroubleTicketUncheckedCreateWithoutCreatedByInputObjectSchema), z.lazy(() => TroubleTicketUncheckedCreateWithoutCreatedByInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TroubleTicketCreateOrConnectWithoutCreatedByInputObjectSchema), z.lazy(() => TroubleTicketCreateOrConnectWithoutCreatedByInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TroubleTicketCreateManyCreatedByInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema), z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const TroubleTicketUncheckedCreateNestedManyWithoutCreatedByInputObjectSchema: z.ZodType<Prisma.TroubleTicketUncheckedCreateNestedManyWithoutCreatedByInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketUncheckedCreateNestedManyWithoutCreatedByInput>;
export const TroubleTicketUncheckedCreateNestedManyWithoutCreatedByInputObjectZodSchema = makeSchema();
