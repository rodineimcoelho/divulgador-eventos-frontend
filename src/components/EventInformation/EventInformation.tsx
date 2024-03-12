import Event from '@/entities/event.entity';
import {
  CalendarMonth,
  CoPresent,
  AccessTime,
  Place,
  Link as LinkIcon
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import EventDetail from '../EventDetail/EventDetail';
import Link from 'next/link';

export default function EventInformation({ event }: { event: Event }) {
  return (
    <>
      <Typography variant="h6" component="div">
        Resumo
      </Typography>
      <Typography variant="body1" paragraph>
        {event?.abstract}
      </Typography>
      <Box>
        <EventDetail
          icon={<CalendarMonth />}
          text={`Data/Hora: ${event?.formattedDate}`}
        />
        <EventDetail
          icon={<CoPresent />}
          text={`Modalidade: ${event?.translatedModality}`}
        />
        <EventDetail
          icon={<AccessTime />}
          text={`Carga Horária: ${event?.workload}`}
        />
        {event?.location && (
          <EventDetail icon={<Place />} text={`Local: ${event?.location}`} />
        )}
        {event?.link && (
          <EventDetail
            icon={<LinkIcon />}
            text={
              <Typography
                component={Link}
                href={event.link}
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  ':hover': {
                    color: 'primary.main'
                  }
                }}
              >
                {event.link}
              </Typography>
            }
          />
        )}
      </Box>
    </>
  );
}
