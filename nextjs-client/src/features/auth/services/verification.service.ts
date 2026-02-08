import { api } from '@/shared/api';

class VerificationService {
  newVerification(token: string) {
    return api.post('/auth/email-confirmation', { token });
  }
}

export const verificationService = new VerificationService();
