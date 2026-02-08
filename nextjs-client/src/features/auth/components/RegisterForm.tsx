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

import { useRegisterMutation } from '../hooks';
import { RegisterSchema, TypeRegisterSchema } from '../schemes';

import { AuthWrapper } from './AuthWrapper';

const RegisterForm = () => {
  const form = useForm<TypeRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
  });

  const { register, isLoadingRegister } = useRegisterMutation();

  const onSubmit = (values: TypeRegisterSchema) => {
    register(values);
  };

  return (
    <AuthWrapper
      heading='Register'
      description='Enter your email and password to create an account'
      backButtonLabel='Aready have an account? Log in'
      backButtonHref='/auth/login'
      isShowSocial
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <Controller
          control={form.control}
          name='name'
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Name</FieldLabel>

                <Input
                  {...field}
                  disabled={isLoadingRegister}
                  placeholder='Alex'
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />
        <Controller
          control={form.control}
          name='email'
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Email</FieldLabel>

                <Input
                  {...field}
                  disabled={isLoadingRegister}
                  type='email'
                  placeholder='alex@example.com'
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />

        <Controller
          control={form.control}
          name='password'
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Password</FieldLabel>

                <Input
                  {...field}
                  disabled={isLoadingRegister}
                  type='password'
                  placeholder='******'
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />

        <Controller
          control={form.control}
          name='passwordRepeat'
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Repeat password</FieldLabel>

                <Input
                  {...field}
                  disabled={isLoadingRegister}
                  type='password'
                  placeholder='******'
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />

        <Button
          disabled={isLoadingRegister}
          className='mt-2 w-full'
          type='submit'
        >
          Create account
        </Button>
      </form>
    </AuthWrapper>
  );
};

export default RegisterForm;
