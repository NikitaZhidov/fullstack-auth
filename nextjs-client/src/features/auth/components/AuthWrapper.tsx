import Link from 'next/link';
import { PropsWithChildren } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui';

import AuthSocial from './AuthSocial';

type AuthWrapperProps = {
  heading: string;
  description?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  isShowSocial?: boolean;
};

export const AuthWrapper = ({
  children,
  heading,
  description,
  backButtonHref,
  backButtonLabel,
  isShowSocial = false,
}: PropsWithChildren<AuthWrapperProps>) => {
  return (
    <Card className='w-md'>
      <CardHeader className='space-y-2'>
        <CardTitle>{heading}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>
        {isShowSocial && (
          <div className='mb-2 space-y-2'>
            <AuthSocial />
            <div className='relative'>
              <div className='flex items-center gap-2'>
                <span className='h-px flex-auto border-t'></span>
                <span className='text-muted-foreground text-xs'>OR</span>
                <span className='h-px flex-auto border-t'></span>
              </div>
            </div>
          </div>
        )}
        {children}
      </CardContent>

      <CardFooter>
        {backButtonLabel && backButtonHref && (
          <Button variant='link' className='w-full font-normal'>
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
