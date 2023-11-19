import { Avatar, Skeleton, Typography } from '@mui/material';
import React, { ReactElement } from 'react';

export default function EventDetailSkeleton() {
  return (
    <Typography
      variant="body1"
      component="div"
      sx={{ display: 'flex', alignItems: 'center', my: 1 }}
    >
      <Skeleton variant="circular" sx={{ mr: 1 }}>
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            height: '1.5em',
            width: '1.5em'
          }}
        ></Avatar>
      </Skeleton>
      <Skeleton variant="rectangular" width="33%" />
    </Typography>
  );
}
