'use client';
import EventCard from '@/components/EventCard/EventCard';
import { useEventsService } from '@/services/events.service';
import Event from '@/entities/event.entity';
import { Container, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EventCardSkeleton from '@/components/EventCardSkeleton/EventCardSkeleton';
import EventCardsList from '@/components/EventCardsList/EventCardsList';

export default function Home() {
  return <EventCardsList title={'Eventos'} />;
}
