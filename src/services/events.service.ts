import Event from '@/entities/event.entity';
import { useApi } from './api';
import EventDto from '@/dto/event.dto';
import { EventType } from '@/types/EventType';

type EventData = {
  title: string;
  type: string;
  lecturerId: string;
  modality: string;
  abstract: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  link?: string;
  isVisible?: boolean;
};

export function useEventsService() {
  const api = useApi();

  function create(data: EventData) {
    return api.post('events', data);
  }

  async function findAll(
    visible?: boolean,
    type?: EventType
  ): Promise<Event[]> {
    const eventsDto: EventDto[] = (
      await api.get('events', { params: { visible, type } })
    ).data;
    return eventsDto.map((eventDto) => new Event(eventDto));
  }

  async function findOne(id: string): Promise<Event> {
    const eventDto: EventDto = (await api.get(`events/${id}`)).data;
    return new Event(eventDto);
  }

  function update(id: string, data: EventData) {
    return api.patch(`events/${id}`, data);
  }

  async function remove(id: string): Promise<void> {
    return api.delete(`events/${id}`);
  }

  return { create, findAll, findOne, update, remove };
}
