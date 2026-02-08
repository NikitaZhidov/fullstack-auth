'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';

import { Button } from '@/shared/components/ui';

import { authService } from '../services';
import { AuthProvider } from '../types';

export interface AuthSocialProps {
  className?: string;
}

const AuthSocial = ({ className }: AuthSocialProps) => {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['oauth by provider'],
    mutationFn: (provider: AuthProvider) =>
      authService.oauthByProvider(provider),
  });

  const onClick = (provider: AuthProvider) => {
    mutateAsync(provider).then(res => res?.url && router.push(res.url));
  };

  return (
    <div className={className}>
      <div className='grid grid-cols-2 gap-6'>
        <Button
          disabled={isPending}
          onClick={() => onClick('google')}
          className='flex items-center'
          variant='outline'
          size='icon-lg'
        >
          <FaGoogle className='size-4' />
        </Button>
      </div>
    </div>
  );
};

export default AuthSocial;
