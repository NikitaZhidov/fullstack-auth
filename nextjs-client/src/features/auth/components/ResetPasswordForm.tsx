'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input,
} from '@/shared/components/ui';

import { useRequestResetPasswordMutation } from '../hooks';
import {
  ResetPasswordSchema,
  TypeResetPassowrdSchema,
} from '../schemes/reset-password.scheme';

const ResetPasswordForm = () => {
  const { requestResetPassword, isLoading } = useRequestResetPasswordMutation();

  const form = useForm<TypeResetPassowrdSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onResetPasswordSubmit = (value: TypeResetPassowrdSchema) => {
    requestResetPassword(value.email);
  };

  return (
    <form
      className='space-y-4'
      onSubmit={form.handleSubmit(onResetPasswordSubmit)}
    >
      <Controller
        control={form.control}
        name='email'
        render={({ field, fieldState }) => {
          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email</FieldLabel>
              <Input
                {...field}
                disabled={isLoading}
                type='email'
                placeholder='alex@example.com'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      ></Controller>

      <Button disabled={isLoading} className='w-full'>
        Reset password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
