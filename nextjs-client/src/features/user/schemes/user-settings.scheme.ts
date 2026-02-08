import { z } from 'zod';

export const UserSettingsSchema = z.object({
  name: z.string().min(1, {
    error: 'Enter name',
  }),
  email: z
    .email({
      error: 'Email is not valid',
    })
    .nonempty({ error: 'Enter email' }),
  isTwoFactorEnabled: z.boolean(),
});
export type TypeUserSettingsSchema = z.infer<typeof UserSettingsSchema>;
