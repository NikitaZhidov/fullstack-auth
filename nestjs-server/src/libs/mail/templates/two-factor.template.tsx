import { Tailwind, Heading, Text, Body } from '@react-email/components';
import { Html } from '@react-email/html';
import * as React from 'react';

export interface TwoFactorTemplateProps {
  token: string;
}

export function TwoFactorTemplate({ token }: TwoFactorTemplateProps) {

  return (
    <Tailwind>
      <Html>
        <Body className="text-black">
          <Heading>Two factor authentication</Heading>

          <Text>
            Hello! Here is your two factor authentication code:
          </Text>

          <Text className='text-black text-3xl font-bold'>{ token }</Text>

          <Text>
            The code expires in 1 hour. If you haven't requested password reset, just ignore this message.
          </Text>

          <Text>Thank you for using our services!</Text>
        </Body>
      </Html>
    </Tailwind>
  )
}
