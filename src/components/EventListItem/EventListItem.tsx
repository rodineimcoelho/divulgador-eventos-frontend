import Event from '@/entities/event.entity';
import { Delete, Edit } from '@mui/icons-material';
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';

export default function EventList({
  event,
  onEdit,
  onRemove
}: {
  event: Event;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <ListItem>
      <ListItemText
        primary={event.title}
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {event.translatedEventType}
            </Typography>{' '}
            <br />
            {event.formattedDate}
          </>
        }
      />
      <ListItemIcon>
        <IconButton onClick={onEdit}>
          <Edit />
        </IconButton>
      </ListItemIcon>
      <ListItemIcon>
        <IconButton onClick={onRemove}>
          <Delete />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
}
