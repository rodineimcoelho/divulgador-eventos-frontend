import LecturerDto from '@/dto/lecturer.dto';
import { getImageSource } from '@/utils/getImageSource';
import { Delete, Edit } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText
} from '@mui/material';

export default function LecturerListItem({
  lecturer,
  onEdit,
  onRemove
}: {
  lecturer: LecturerDto;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          alt={lecturer.presentation}
          src={getImageSource(lecturer.imageName)}
        />
      </ListItemAvatar>
      <ListItemText primary={lecturer.presentation} />
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
