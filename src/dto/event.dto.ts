import { EventType } from '@/types/EventType';
import LecturerDto from './lecturer.dto';
import { EventModality } from '@/types/EventModality';

export default interface EventDto {
  id: string;
  title: string;
  type: EventType;
  lecturer?: LecturerDto;
  lecturerId: string;
  modality: EventModality;
  abstract: string;
  startDate: string;
  endDate: string;
  location: string | null;
  link: string | null;
  isVisible: boolean;
}
