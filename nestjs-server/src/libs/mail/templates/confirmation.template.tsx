import { Body, Heading, Link, Tailwind, Text } from '@react-email/components';
import { Html } from '@react-email/html';
import * as React from 'react';

export interface ConfirmationTemplateProps {
  domain: string;
  token: string;
}

export function ConfirmationTemplate({ domain, token }: ConfirmationTemplateProps) {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  return (
    <Tailwind>
      <Html>
        <Body className="text-black">
          <Heading>Email confirmation</Heading>

          <Text>
            Hello! To confirm your email address follow this link:
          </Text>

          <Link href={confirmLink}>Confirm Email</Link>

          <Text>
            The link expires in 1 hour. If you haven't requested the confirmation, just ignore this message.
          </Text>

          <Text>Thank you for using our services!</Text>
        </Body>
      </Html>
    </Tailwind>
  )
}
