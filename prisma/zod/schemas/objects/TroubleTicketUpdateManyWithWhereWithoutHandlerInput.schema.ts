import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { TroubleTicketScalarWhereInputObjectSchema as TroubleTicketScalarWhereInputObjectSchema } from './TroubleTicketScalarWhereInput.schema';
import { TroubleTicketUpdateManyMutationInputObjectSchema as TroubleTicketUpdateManyMutationInputObjectSchema } from './TroubleTicketUpdateManyMutationInput.schema';
import { TroubleTicketUncheckedUpdateManyWithoutHandlerInputObjectSchema as TroubleTicketUncheckedUpdateManyWithoutHandlerInputObjectSchema } from './TroubleTicketUncheckedUpdateManyWithoutHandlerInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TroubleTicketScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => TroubleTicketUpdateManyMutationInputObjectSchema), z.lazy(() => TroubleTicketUncheckedUpdateManyWithoutHandlerInputObjectSchema)])
}).strict();
export const TroubleTicketUpdateManyWithWhereWithoutHandlerInputObjectSchema: z.ZodType<Prisma.TroubleTicketUpdateManyWithWhereWithoutHandlerInput> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketUpdateManyWithWhereWithoutHandlerInput>;
export const TroubleTicketUpdateManyWithWhereWithoutHandlerInputObjectZodSchema = makeSchema();
