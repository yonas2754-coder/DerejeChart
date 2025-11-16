import * as z from 'zod';

export const RoleSchema = z.enum(['manager', 'supervisor', 'user'])

export type Role = z.infer<typeof RoleSchema>;