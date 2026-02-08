'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  Switch,
} from '@/shared/components/ui';
import LoadingView from '@/shared/components/ui/LoadingView';
import { useProfile } from '@/shared/hooks';

import { useUpdateProfileMutation } from '../hooks';
import { TypeUserSettingsSchema, UserSettingsSchema } from '../schemes';

import UserButton, { UserButtonLoading } from './UserButton';

const UserSettingsForm = () => {
  const { user, isLoading } = useProfile();

  const form = useForm({
    resolver: zodResolver(UserSettingsSchema),
    values: {
      email: user?.email || '',
      name: user?.displayName || '',
      isTwoFactorEnabled: user?.isTwoFactorEnabled ?? false,
    },
  });

  const { updateProfile, isLoading: isUserProfileUpdating } =
    useUpdateProfileMutation();

  const onSubmit = (settings: TypeUserSettingsSchema) => {
    updateProfile(settings);
  };

  return (
    <Card className='w-md'>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle>Profile settings</CardTitle>

        {isLoading ? (
          <UserButtonLoading />
        ) : (
          user && <UserButton profile={user} />
        )}
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <LoadingView />
        ) : (
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              control={form.control}
              name='name'
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Name</FieldLabel>

                    <Input
                      disabled={isUserProfileUpdating}
                      {...field}
                      type='text'
                      placeholder='Alex'
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
              name='email'
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>

                    <Input
                      {...field}
                      type='email'
                      placeholder='alex@example.com'
                      disabled={isUserProfileUpdating}
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
              name='isTwoFactorEnabled'
              render={({ field, fieldState }) => {
                return (
                  <Field className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <div className='space-y-0.5'>
                      <FieldLabel>Two factor authentication</FieldLabel>

                      <FieldDescription>
                        Enable two factor authentication for your account
                      </FieldDescription>
                    </div>

                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isUserProfileUpdating}
                    />
                  </Field>
                );
              }}
            ></Controller>

            <Button type='submit' className='w-full'>
              Save
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default UserSettingsForm;
