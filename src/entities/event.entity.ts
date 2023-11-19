import EventDto from '@/dto/event.dto';
import LecturerDto from '@/dto/lecturer.dto';
import { EventModality } from '@/types/EventModality';
import { EventType } from '@/types/EventType';
import dayjs from 'dayjs';

export default class Event {
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

  constructor(eventDto: EventDto) {
    this.id = eventDto.id;
    this.title = eventDto.title;
    this.type = eventDto.type;
    this.lecturer = eventDto.lecturer;
    this.lecturerId = eventDto.lecturerId;
    this.modality = eventDto.modality;
    this.abstract = eventDto.abstract;
    this.startDate = eventDto.startDate;
    this.endDate = eventDto.endDate;
    this.location = eventDto.location;
    this.link = eventDto.link;
    this.isVisible = eventDto.isVisible;
  }

  get formattedDate() {
    const startDate = dayjs(this.startDate);
    const endDate = dayjs(this.endDate);

    if (startDate.isSame(endDate, 'day')) {
      const day = startDate.format('DD/MM/YYYY');
      const startTime = startDate.format('HH:hh');
      const endTime = endDate.format('HH:hh');

      return `${day} - ${startTime} - ${endTime}`;
    }

    const startDateTime = startDate.format('DD/MM/YYYY HH:mm');
    const endDateTime = endDate.format('DD/MM/YYYY HH:mm');

    return `${startDateTime} - ${endDateTime}`;
  }

  get translatedEventType() {
    enum translation {
      'COURSE' = 'Curso',
      'LECTURE' = 'Palestra',
      'ROUND_TABLE' = 'Mesa Redonda',
      'SHORT_COURSE' = 'Minicurso',
      'WORKSHOP' = 'Oficina'
    }

    return translation[this.type];
  }

  get translatedModality() {
    enum translation {
      'IN_PERSON' = 'Presencial',
      'ONLINE' = 'Online'
    }

    return translation[this.modality];
  }

  get workload() {
    const startDate = dayjs(this.startDate);
    const endDate = dayjs(this.endDate);

    let minutes = endDate.diff(startDate, 'minute');
    const hours = minutes / 60;
    minutes = minutes % 60;

    return `${hours}:${minutes}`;
  }
}
