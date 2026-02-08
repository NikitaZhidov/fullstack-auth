import z from 'zod';

export const LoginSchema = z.object({
  email: z.email({ error: 'Email is not valid' }),
  password: z.string().nonempty({ error: 'Enter your password' }),
  code: z.string().optional(),
});

export type TypeLoginSchema = z.infer<typeof LoginSchema>;
