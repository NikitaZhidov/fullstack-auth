import { api } from '@/shared/api';

import { ResetPassword } from '../types/reset-password';

class PasswordRecoveryService {
  requestResetPassword(email: string) {
    return api.post('/auth/password-recovery/request-reset-password', {
      email,
    });
  }

  resetPassword(resetPasswordInfo: ResetPassword) {
    return api.post('/auth/password-recovery/new-password', {
      ...resetPasswordInfo,
    });
  }
}

export const passwordRecoveryService = new PasswordRecoveryService();
