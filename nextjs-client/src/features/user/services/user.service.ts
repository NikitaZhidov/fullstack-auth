import { User } from '@/features/auth/types';

import { api } from '@/shared/api';

import { TypeUserSettingsSchema } from '../schemes';

class UserService {
  getProfile() {
    return api.get<User>('/users/profile');
  }

  updateProfile(profile: TypeUserSettingsSchema) {
    return api.post<User, TypeUserSettingsSchema>('/users/profile', profile);
  }
}

export const userService = new UserService();
