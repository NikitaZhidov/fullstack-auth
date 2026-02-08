'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { toastMessageHandler } from '@/shared/utils';

import { authService } from '../services';

export function useLogoutMutation() {
  const router = useRouter();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onError: toastMessageHandler,
    onSuccess() {
      router.push('/auth/login');
    },
  });

  return { logout, isLoading };
}
