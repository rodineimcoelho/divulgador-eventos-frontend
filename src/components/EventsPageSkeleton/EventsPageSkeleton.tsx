import { Typography, Avatar, Tabs, Tab, Box, Skeleton } from '@mui/material';
import EventInformationSkeleton from '../EventInformationSkeleton/EventInformationSkeleton';

export default function EventsPageSkeleton() {
  return (
    <>
      <Skeleton variant="text" width="80%">
        <Typography variant="h2" component="h1">
          placeholder
        </Typography>
      </Skeleton>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton variant="circular" sx={{ mr: 2 }}>
          <Avatar sx={{ width: '7.5rem', height: '7.5rem' }} />
        </Skeleton>
        <Box>
          <Skeleton variant="text">
            <Typography variant="h6" component="div">
              Ministrante
            </Typography>
          </Skeleton>
          <Skeleton variant="text" width="100%">
            <Typography variant="h5" component="div">
              placeholder
            </Typography>
          </Skeleton>
        </Box>
      </Box>
      <Skeleton variant="rounded">
        <Tabs>
          <Tab />
          <Tab label="Ministrante" />
        </Tabs>
      </Skeleton>

      <EventInformationSkeleton />
    </>
  );
}
