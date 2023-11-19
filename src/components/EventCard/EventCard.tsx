import Event from '@/entities/event.entity';
import {
  AccessTime,
  CalendarMonth,
  CoPresent,
  Person
} from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import Link from 'next/link';
import EventDetail from '../EventDetail/EventDetail';
import { useRouter } from 'next/navigation';

export default function EventCard({
  event,
  showType = true
}: {
  event: Event;
  showType?: boolean;
}) {
  const router = useRouter();

  return (
    <Card
      sx={{
        width: '100%',
        borderLeft: 'solid',
        borderColor: 'primary.main',
        borderWidth: 4,
        p: 1
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component={Link}
          href={`events/${event.id}`}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            ':hover': {
              color: 'primary.main'
            }
          }}
        >
          {showType
            ? `${event.translatedEventType}: ${event.title}`
            : event.title}
        </Typography>

        <EventDetail
          icon={<Person />}
          text={`Ministrante: ${event.lecturer?.presentation}`}
        />
        <EventDetail
          icon={<CalendarMonth />}
          text={`Data/Hora: ${event.formattedDate}`}
        />
        <EventDetail
          icon={<CoPresent />}
          text={`Modalidade: ${event.translatedModality}`}
        />
        <EventDetail
          icon={<AccessTime />}
          text={`Carga Horária: ${event.workload}`}
        />
      </CardContent>
      <CardActions>
        <Button onClick={() => router.push(`events/${event.id}`)}>
          Detalhes
        </Button>
      </CardActions>
    </Card>
  );
}
