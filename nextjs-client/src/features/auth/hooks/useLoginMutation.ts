'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { toastMessageHandler } from '@/shared/utils';

import { TypeLoginSchema } from '../schemes/login.scheme';
import { authService, isLoginMessage } from '../services';

export function useLoginMutation(setShowTwoFactor: (show: boolean) => void) {
  const router = useRouter();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationKey: ['login user'],
    mutationFn: (loginInfo: TypeLoginSchema) => authService.login(loginInfo),
    onSuccess(data) {
      if (isLoginMessage(data)) {
        toastMessageHandler(data);
        setShowTwoFactor(true);
      } else {
        toast.message('You successfully logged in.');
        router.push('/dashboard/settings');
      }
    },
    onError: toastMessageHandler,
  });

  return { login, isLoading };
}
