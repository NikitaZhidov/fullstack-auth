'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import LoadingView from '@/shared/components/ui/LoadingView';

import { useVerificationMutation } from '../hooks/useVerificationMutation';

import { AuthWrapper } from './AuthWrapper';

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { newVerification } = useVerificationMutation();

  useEffect(() => {
    newVerification(token ?? '');
  }, [token]);

  return (
    <AuthWrapper heading='Email confirmation'>
      <div>
        <LoadingView />
      </div>
    </AuthWrapper>
  );
};

export default NewVerificationForm;
