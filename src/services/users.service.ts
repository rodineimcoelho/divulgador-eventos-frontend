import { User } from '@/types/User';
import { api } from './api';

type CreateUserData = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

type UpdateUserData = {
  fullName: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  currentPassword: string;
};

class UsersService {
  create(user: CreateUserData) {
    return api.post('users', user);
  }

  async findById(id: string): Promise<User> {
    return (await api.get(`users/${id}`)).data;
  }

  update(id: string, user: UpdateUserData) {
    return api.patch(`users/${id}`, user);
  }
}

export default new UsersService();
