'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input,
} from '@/shared/components/ui';

import { useLoginMutation } from '../hooks';
import { LoginSchema, TypeLoginSchema } from '../schemes/login.scheme';

import { AuthWrapper } from './AuthWrapper';

export const LoginForm = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const { login, isLoading } = useLoginMutation(show => setShowTwoFactor(show));

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: TypeLoginSchema) => {
    login(values);
  };

  return (
    <AuthWrapper
      heading='Log in'
      description='Enter your email and password to log in'
      isShowSocial={true}
      backButtonLabel="Don't have an account? Register"
      backButtonHref='/auth/register'
    >
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        {showTwoFactor && (
          <>
            <Controller
              control={form.control}
              name='code'
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Two factor code</FieldLabel>
                    <Input
                      {...field}
                      placeholder='123456'
                      disabled={isLoading}
                      type='text'
                      maxLength={6}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            ></Controller>
          </>
        )}

        {!showTwoFactor && (
          <>
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

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            ></Controller>

            <Controller
              control={form.control}
              name='password'
              render={({ field, fieldState }) => {
                return (
                  <div className='space-y-2'>
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Password</FieldLabel>

                      <Input
                        {...field}
                        disabled={isLoading}
                        type='password'
                        placeholder='******'
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>

                    <div className='text-xs'>
                      <span className='text-muted-foreground'>
                        Forgot your password?{' '}
                      </span>
                      <Link className='underline' href={'/auth/reset-password'}>
                        Reset
                      </Link>
                    </div>
                  </div>
                );
              }}
            ></Controller>
          </>
        )}

        <Button disabled={isLoading} type='submit' className='w-full'>
          Log in
        </Button>
      </form>
    </AuthWrapper>
  );
};
