import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { toastMessageHandler } from '@/shared/utils';

import { TypeRegisterSchema } from '../schemes';
import { authService } from '../services';

export function useRegisterMutation() {
  const { mutate: register, isPending: isLoadingRegister } = useMutation({
    mutationKey: ['register user'],
    mutationFn: (registerInfo: TypeRegisterSchema) =>
      authService.register(registerInfo),
    onSuccess() {
      toast.success('Successfully registered', {
        description:
          'Registration was successful. The confirmation message has been sent to your email.',
      });
    },
    onError: toastMessageHandler,
  });

  return { register, isLoadingRegister };
}
