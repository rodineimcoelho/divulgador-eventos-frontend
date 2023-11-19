import { Avatar, Typography } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';

export default function EventDetail({
  text,
  icon
}: {
  text: ReactNode;
  icon: ReactElement;
}) {
  const actualIcon = React.cloneElement(icon, { fontSize: 'small' });

  return (
    <Typography
      variant="body1"
      component="div"
      sx={{ display: 'flex', alignItems: 'center', my: 1 }}
    >
      <Avatar
        sx={{
          bgcolor: 'primary.main',
          mr: 1,
          height: '1.5em',
          width: '1.5em'
        }}
      >
        {actualIcon}
      </Avatar>
      {text}
    </Typography>
  );
}
