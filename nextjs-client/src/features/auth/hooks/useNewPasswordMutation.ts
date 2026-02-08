'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { toastMessageHandler } from '@/shared/utils';

import { passwordRecoveryService } from '../services';
import { ResetPassword } from '../types/reset-password';

export function useNewPasswordMutation() {
  const router = useRouter();

  const { mutate: resetPassword, isPending: isLoading } = useMutation({
    mutationKey: ['user new password'],
    mutationFn: (resetPasswordInfo: ResetPassword) =>
      passwordRecoveryService.resetPassword(resetPasswordInfo),
    onError: toastMessageHandler,
    onSuccess() {
      toast.success('The password has successfully been updated.');
      router.push('/auth/login');
    },
  });

  return { resetPassword, isLoading };
}
