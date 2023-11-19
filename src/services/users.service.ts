import UserDto from '@/dto/user.dto';
import { useApi } from './api';

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

  async function findById(id: string): Promise<UserDto> {
    return (await api.get(`users/${id}`)).data;
  }

  function update(id: string, user: UpdateUserData) {
    return api.patch(`users/${id}`, user);
  }

  return { create, findById, update };
}
