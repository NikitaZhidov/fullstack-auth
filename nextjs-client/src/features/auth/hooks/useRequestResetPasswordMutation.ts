import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { toastMessageHandler } from '@/shared/utils';

import { passwordRecoveryService } from '../services';

export function useRequestResetPasswordMutation() {
  const { mutate: requestResetPassword, isPending: isLoading } = useMutation({
    mutationKey: ['request reset password mutation'],
    mutationFn: (email: string) =>
      passwordRecoveryService.requestResetPassword(email),
    onError: toastMessageHandler,
    onSuccess: () =>
      toast.success('The reset password link has been sent to your email.'),
  });

  return { requestResetPassword, isLoading };
}
