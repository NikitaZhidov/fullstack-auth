'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input,
} from '@/shared/components/ui';

import { useNewPasswordMutation } from '../hooks';
import { NewPasswordSchema, TypeNewPasswordSchema } from '../schemes';
import { ResetPassword } from '../types/reset-password';

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const { resetPassword, isLoading } = useNewPasswordMutation();

  const form = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      passwordRepeat: '',
    },
  });

  const onSubmit = (resetPasswordInfo: TypeNewPasswordSchema) => {
    resetPassword({
      password: resetPasswordInfo.password,
      passwordRepeat: resetPasswordInfo.passwordRepeat,
      token,
    });
  };

  return (
    <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        control={form.control}
        name='password'
        render={({ field, fieldState }) => {
          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Password</FieldLabel>
              <Input {...field} type='password' placeholder='******' />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      ></Controller>
      <Controller
        control={form.control}
        name='passwordRepeat'
        render={({ field, fieldState }) => {
          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Repeat password</FieldLabel>
              <Input {...field} type='password' placeholder='******' />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      ></Controller>

      <Button type='submit' disabled={isLoading} className='w-full'>
        Reset password
      </Button>
    </form>
  );
};

export default NewPasswordForm;
