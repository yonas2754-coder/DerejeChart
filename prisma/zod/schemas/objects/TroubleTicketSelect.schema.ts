import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  serviceNumber: z.boolean().optional(),
  tasksClassification: z.boolean().optional(),
  requestType: z.boolean().optional(),
  specificRequestType: z.boolean().optional(),
  zone: z.boolean().optional(),
  remarks: z.boolean().optional(),
  priority: z.boolean().optional(),
  status: z.boolean().optional(),
  pending_endAt: z.boolean().optional(),
  resolvedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdById: z.boolean().optional(),
  createdBy: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  handlerId: z.boolean().optional(),
  handler: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const TroubleTicketSelectObjectSchema: z.ZodType<Prisma.TroubleTicketSelect> = makeSchema() as unknown as z.ZodType<Prisma.TroubleTicketSelect>;
export const TroubleTicketSelectObjectZodSchema = makeSchema();
