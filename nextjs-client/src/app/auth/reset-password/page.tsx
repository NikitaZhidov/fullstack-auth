import { Metadata } from 'next';

import { AuthWrapper } from '@/features/auth/components';
import ResetPasswordForm from '@/features/auth/components/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Reset password',
};

const ResetPasswordPage = () => {
  return (
    <AuthWrapper
      heading='Reset password'
      isShowSocial={false}
      description='Enter your email to reset password'
      backButtonHref='/auth/login'
      backButtonLabel='Already have an account? Log in'
    >
      <ResetPasswordForm />
    </AuthWrapper>
  );
};

export default ResetPasswordPage;
