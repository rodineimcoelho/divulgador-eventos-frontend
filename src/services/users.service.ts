import { User } from '@/types/User';
import { useApi } from './api';
import { AxiosInstance } from 'axios';

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

export function useUsersService() {
  const api = useApi();

  function create(user: CreateUserData) {
    return api.post('users', user);
  }

  async function findById(id: string): Promise<User> {
    return (await api.get(`users/${id}`)).data;
  }

  function update(id: string, user: UpdateUserData) {
    return api.patch(`users/${id}`, user);
  }

  return { create, findById, update };
}
