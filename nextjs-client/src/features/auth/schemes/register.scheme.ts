import { z } from 'zod';

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      error: 'Enter name',
    }),
    email: z.email({
      error: 'Email is not valid',
    }),
    password: z.string().min(6, {
      error: 'Password should contain at least 6 characters',
    }),
    passwordRepeat: z.string().min(6, {
      error: 'Password repeat should contain at least 6 characters',
    }),
  })
  .refine(data => data.password === data.passwordRepeat, {
    error: 'The passwords do not match',
    path: ['passwordRepeat'],
  });

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>;
