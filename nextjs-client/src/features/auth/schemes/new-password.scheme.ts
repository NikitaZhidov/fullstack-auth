import z from 'zod';

export const NewPasswordSchema = z
  .object({
    password: z
      .string({ error: 'Password should be a string' })
      .min(6, { error: 'Password should contain at least 6 characters' }),

    passwordRepeat: z.string(),
  })
  .refine(data => data.password === data.passwordRepeat, {
    error: 'The passwords do not match',
    path: ['passwordRepeat'],
  });

export type TypeNewPasswordSchema = z.infer<typeof NewPasswordSchema>;
