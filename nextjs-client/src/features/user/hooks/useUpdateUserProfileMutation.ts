import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { toastMessageHandler } from '@/shared/utils';

import { TypeUserSettingsSchema } from '../schemes';
import { userService } from '../services';

export function useUpdateProfileMutation() {
  const { mutate: updateProfile, isPending: isLoading } = useMutation({
    mutationKey: ['update user profile'],
    mutationFn: (profile: TypeUserSettingsSchema) =>
      userService.updateProfile(profile),
    onError: toastMessageHandler,
    onSuccess: () => {
      toast.success('Profile has been updated');
    },
  });

  return { updateProfile, isLoading };
}
