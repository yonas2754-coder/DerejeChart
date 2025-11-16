import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketWhereUniqueInputObjectSchema as TroubleTicketWhereUniqueInputObjectSchema } from './TroubleTicketWhereUniqueInput.schema';
import { TroubleTicketCreateWithoutCreatedByInputObjectSchema as TroubleTicketCreateWithoutCreatedByInputObjectSchema } from './TroubleTicketCreateWithoutCreatedByInput.schema';
import { TroubleTicketUncheckedCreateWithoutCreatedByInputObjectSchema as TroubleTicketUncheckedCreateWithoutCreatedByInputObjectSchema } from './TroubleTicketUncheckedCreateWithoutCreatedByInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TroubleTicketWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => TroubleTicketCreateWithoutCreatedByInputObjectSchema), z.lazy(() => TroubleTicketUncheckedCreateWithoutCreatedByInputObjectSchema)])
}).strict();
export const TroubleTicketCreateOrConnectWithoutCreatedByInputObjectSchema: z.ZodType<Prisma.TroubleTicketCreateOrConnectWithoutCreatedByInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketCreateOrConnectWithoutCreatedByInput>;
export const TroubleTicketCreateOrConnectWithoutCreatedByInputObjectZodSchema = makeSchema();
