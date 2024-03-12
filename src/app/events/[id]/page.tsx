'use client';
import EventPageContent from '@/components/EventPageContent/EventPageContent';
import EventsPageSkeleton from '@/components/EventsPageSkeleton/EventsPageSkeleton';
import Event from '@/entities/event.entity';
import { useEventsService } from '@/services/events.service';
import { Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event>();
  const { findOne } = useEventsService();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const event = await findOne(params.id);
        setEvent(event);
      } catch (error) {
        router.push('/');
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, router]);

  return (
    <Container
      fixed
      sx={{ display: 'flex', flexDirection: 'column', my: 4, gap: 2 }}
    >
      {event ? <EventPageContent event={event} /> : <EventsPageSkeleton />}
    </Container>
  );
}
