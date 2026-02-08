import { Metadata } from 'next';

import NewVerificationForm from '@/features/auth/components/NewVerificationForm';

export const metadata: Metadata = {
  title: 'Email confirmation',
};

const NewVerificationPage = () => {
  return (
    <div>
      <NewVerificationForm />
    </div>
  );
};

export default NewVerificationPage;
