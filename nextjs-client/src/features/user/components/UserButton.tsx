import { LuLogOut } from 'react-icons/lu';

import { useLogoutMutation } from '@/features/auth/hooks';
import { User } from '@/features/auth/types';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
} from '@/shared/components/ui';

export interface UserButtonProps {
  profile: User;
}

const UserButton = ({ profile }: UserButtonProps) => {
  const { logout, isLoading: isLoadingLogout } = useLogoutMutation();

  if (!profile) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={profile?.picture} />
          <AvatarFallback>{profile.displayName?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-40' align='end'>
        <DropdownMenuItem disabled={isLoadingLogout} onClick={() => logout()}>
          <LuLogOut className='mr-4 size-4' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function UserButtonLoading() {
  return <Skeleton className='h-8 w-8 rounded-full' />;
}

export default UserButton;
