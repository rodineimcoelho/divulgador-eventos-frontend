import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { MouseEventHandler, ReactNode } from 'react';

export default function DrawerListAction({
  children,
  onClick
}: {
  children: ReactNode;
  onClick?: MouseEventHandler;
}) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemText>{children}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
