import LecturerDto from '@/dto/lecturer.dto';
import { useApi } from './api';

type CreateLecturerData = {
  presentation: string;
  about: string;
  image: File;
};

type UpdateLecturerData = {
  presentation?: string;
  about?: string;
  image?: File;
};

export function useLecturersService() {
  const api = useApi();

  function create(data: CreateLecturerData) {
    return api.post('lecturers', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  async function findAll(): Promise<LecturerDto[]> {
    return (await api.get('lecturers')).data;
  }

  function update(id: string, data: UpdateLecturerData) {
    return api.patch(`lecturers/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  async function remove(id: string): Promise<void> {
    return api.delete(`lecturers/${id}`);
  }

  return { create, findAll, update, remove };
}
