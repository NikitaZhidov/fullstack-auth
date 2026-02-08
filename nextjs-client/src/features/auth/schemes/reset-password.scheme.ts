import z from 'zod';

export const ResetPasswordSchema = z.object({
  email: z
    .email({ error: 'Email is not valid' })
    .nonempty({ error: 'Enter email' }),
});

export type TypeResetPassowrdSchema = z.infer<typeof ResetPasswordSchema>;
