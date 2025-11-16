import * as z from 'zod';

export const TaskClassificationSchema = z.enum(['Provisioning', 'Maintenance', 'Others'])

export type TaskClassification = z.infer<typeof TaskClassificationSchema>;