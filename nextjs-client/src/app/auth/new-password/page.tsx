import { Metadata } from 'next';

import { AuthWrapper } from '@/features/auth/components';
import NewPasswordForm from '@/features/auth/components/NewPasswordForm';

export const metadata: Metadata = {
  title: 'New password',
};

const NewPasswordPage = () => {
  return (
    <AuthWrapper
      heading='New password'
      description='Come up with a new password'
    >
      <NewPasswordForm />
    </AuthWrapper>
  );
};

export default NewPasswordPage;
