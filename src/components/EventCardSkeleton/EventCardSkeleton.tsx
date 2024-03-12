import {
  Button,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography
} from '@mui/material';
import Link from 'next/link';
import EventDetailSkeleton from '../EventDetailSkeleton/EventDetailSkeleton';
import {
  Person,
  CalendarMonth,
  CoPresent,
  AccessTime
} from '@mui/icons-material';

export default function EventCardSkeleton() {
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
        <Skeleton variant="rectangular" width="80%">
          <Typography
            variant="h5"
            component={Link}
            href="/"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              ':hover': {
                color: 'primary.main'
              },
              height: '1em'
            }}
          >
            placeholder
          </Typography>
        </Skeleton>
        <EventDetailSkeleton />
        <EventDetailSkeleton />
        <EventDetailSkeleton />
        <EventDetailSkeleton />
      </CardContent>
      <CardActions>
        <Skeleton variant="rounded">
          <Button>Detalhes</Button>
        </Skeleton>
      </CardActions>
    </Card>
  );
}
