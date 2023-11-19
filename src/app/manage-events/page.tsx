'use client';
import EventModal from '@/components/EventModal/EventModal';
import EventListItem from '@/components/EventListItem/EventListItem';
import { useEventsService } from '@/services/events.service';
import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  List,
  Typography
} from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import Event from '@/entities/event.entity';

export default function ManageEvents() {
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event>();
  const [eventToDeleteId, setEventToDeleteId] = useState<string>();
  const [events, setEvents] = useState<Event[]>();
  const eventsService = useEventsService();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchData() {
    const events = await eventsService.findAll();
    setEvents(events);
  }

  async function removeEvent() {
    await eventsService.remove(eventToDeleteId!);
    if (events) {
      const index = events?.findIndex((Event) => Event.id === eventToDeleteId);
      const newEvents = [...events];
      newEvents.splice(index, 1);
      setEvents(newEvents);
    }
    setEventToDeleteId(undefined);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        sx={{
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          p: 4,
          gap: 3
        }}
      >
        <Typography component="h1" variant="h4">
          Gerenciar Eventos
        </Typography>

        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {events &&
            events?.map((event, index) => (
              <React.Fragment key={event.id}>
                {index > 0 && <Divider />}
                <EventListItem
                  event={event}
                  onRemove={() => setEventToDeleteId(event.id)}
                  onEdit={() => {
                    setEventToEdit(event);
                  }}
                />
              </React.Fragment>
            ))}
        </List>

        <Button
          variant="contained"
          color="primary"
          aria-label="add"
          onClick={() => setIsAddingEvent(true)}
        >
          <Add sx={{ mr: 1 }} />
          Adicionar evento
        </Button>
      </Box>

      {isAddingEvent && (
        <EventModal
          isModalOpen
          mode="add"
          handleModal={(result) => {
            setIsAddingEvent(false);
            if (result) fetchData();
          }}
        />
      )}

      {eventToEdit && (
        <EventModal
          isModalOpen
          mode="edit"
          event={eventToEdit}
          handleModal={(result) => {
            setEventToEdit(undefined);
            if (result) fetchData();
          }}
        />
      )}

      {eventToDeleteId && (
        <Dialog open={!!eventToDeleteId}>
          <DialogTitle>Quer remover o evento?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setEventToDeleteId(undefined)}>
              Cancelar
            </Button>
            <Button onClick={removeEvent}>Confirmar</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
