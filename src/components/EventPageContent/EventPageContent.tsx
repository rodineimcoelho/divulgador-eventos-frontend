import Event from '@/entities/event.entity';
import EventInformation from '../EventInformation/EventInformation';
import { getImageSource } from '@/utils/getImageSource';
import { Typography, Box, Avatar, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import LecturerInformation from '../LecturerInformation/LecturerInformation';

export default function EventPageContent({ event }: { event: Event }) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <Typography variant="h2" component="h1">
        {event.title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={getImageSource(event.lecturer?.imageName!)}
          sx={{ width: '7.5rem', height: '7.5rem', mr: 2 }}
        />
        <Box>
          <Typography variant="h6" component="div">
            Ministrante
          </Typography>
          <Typography variant="h5" component="div">
            {event.lecturer?.presentation}
          </Typography>
        </Box>
      </Box>
      {currentTab !== undefined && (
        <>
          <Tabs
            value={currentTab}
            onChange={(_event, value) => setCurrentTab(value)}
          >
            <Tab label={event.translatedEventType} />
            <Tab label="Ministrante" />
          </Tabs>
          {currentTab === 0 ? (
            <EventInformation event={event} />
          ) : (
            <LecturerInformation lecturer={event.lecturer!} />
          )}
        </>
      )}
    </>
  );
}
