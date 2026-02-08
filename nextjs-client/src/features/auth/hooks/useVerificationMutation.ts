import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { toastMessageHandler } from '@/shared/utils';

import { verificationService } from '../services';

export function useVerificationMutation() {
  const router = useRouter();

  const { mutate: newVerification, isPending: isLoading } = useMutation({
    mutationKey: ['email verification'],
    mutationFn: (token: string) => verificationService.newVerification(token),
    onSuccess() {
      toast.success('The email has successfully been confirmed.');
      router.push('/dashboard/settings');
    },
    onError: error => {
      toastMessageHandler(error);
      router.push('/auth/login');
    },
  });

  return { newVerification, isLoading };
}
