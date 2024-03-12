'use client';
import EventCard from '@/components/EventCard/EventCard';
import { useEventsService } from '@/services/events.service';
import Event from '@/entities/event.entity';
import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EventCardSkeleton from '@/components/EventCardSkeleton/EventCardSkeleton';
import { EventType } from '@/types/EventType';

export default function Home({
  title,
  eventType
}: {
  title: string;
  eventType?: EventType;
}) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { findAll } = useEventsService();

  const skeletons = [];
  for (let i = 0; i < 3; i++) skeletons.push(<EventCardSkeleton key={i} />);

  useEffect(() => {
    async function fetchData() {
      const events = await findAll(true, eventType);
      setEvents(events);
      setIsLoading(false);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      fixed
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        my: 4,
        gap: 2
      }}
    >
      <Typography component="h1" variant="h4">
        {title}
      </Typography>
      {isLoading ? (
        skeletons
      ) : events.length ? (
        events.map((event) => (
          <EventCard event={event} key={event.id} showType={!eventType} />
        ))
      ) : (
        <Typography>Não há nenhum evento a exibir.</Typography>
      )}
    </Container>
  );
}
