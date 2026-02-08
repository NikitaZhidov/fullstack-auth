import { Metadata } from 'next';

import UserSettingsForm from '@/features/user/components/UserSettingsForm';

export const metadata: Metadata = {
  title: 'Profile settings',
};

const DashboardSettingsPage = () => {
  return <UserSettingsForm />;
};

export default DashboardSettingsPage;
