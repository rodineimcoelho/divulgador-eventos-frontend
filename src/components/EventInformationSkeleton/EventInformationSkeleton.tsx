import { Box, Skeleton, Typography } from '@mui/material';
import EventDetailSkeleton from '../EventDetailSkeleton/EventDetailSkeleton';

export default function EventInformationSkeleton() {
  return (
    <>
      <Skeleton variant="text">
        <Typography variant="h6" component="div">
          Resumo
        </Typography>
      </Skeleton>

      <Box>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
      </Box>

      <Box>
        <EventDetailSkeleton />
        <EventDetailSkeleton />
        <EventDetailSkeleton />
        <EventDetailSkeleton />
        <EventDetailSkeleton />
      </Box>
    </>
  );
}
