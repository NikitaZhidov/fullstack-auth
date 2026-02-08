import { Body, Heading, Html, Link, Tailwind, Text } from '@react-email/components';
import * as React from 'react';

export interface ResetPasswordTemplateProps {
  domain: string;
  token: string;
}


export function ResetPasswordTemplate({ domain, token }: ResetPasswordTemplateProps) {
  const confirmLink = `${domain}/auth/new-password?token=${token}`;

  return (
    <Tailwind>
      <Html>
        <Body className="text-black">
          <Heading>Password reset</Heading>

          <Text>
            Hello! To reset your password follow this link:
          </Text>

          <Link href={confirmLink}>Reset password</Link>

          <Text>
            The link expires in 1 hour. If you haven't requested password reset, just ignore this message.
          </Text>

          <Text>Thank you for using our services!</Text>
        </Body>
      </Html>
    </Tailwind>
  )
}
