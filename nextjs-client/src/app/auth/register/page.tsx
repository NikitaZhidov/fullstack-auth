import { Metadata } from 'next';

import RegisterForm from '@/features/auth/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Create account',
};

export default function RegisterPage() {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
