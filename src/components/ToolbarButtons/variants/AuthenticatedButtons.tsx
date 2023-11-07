import DrawerListAction from '@/components/DrawerListAction/DrawerListAction';
import { AuthContext } from '@/context/AuthContext';
import { AccountCircle } from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useContext, useState } from 'react';

export default function AuthenticatedButtons() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, signOut } = useContext(AuthContext);
  const router = useRouter();

  const handleDrawer: MouseEventHandler = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="Conta do usuário"
        color="inherit"
        aria-haspopup="true"
        onClick={handleDrawer}
      >
        <AccountCircle />
      </IconButton>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawer}>
        <Box onClick={handleDrawer}>
          <Typography variant="h6" sx={{ p: 2 }}>
            {user?.fullName}
          </Typography>
        </Box>
        <Divider />
        <List disablePadding>
          <DrawerListAction onClick={() => router.push('/update-account')}>
            Editar conta
          </DrawerListAction>
          <DrawerListAction onClick={signOut}>Sair</DrawerListAction>
        </List>
      </Drawer>
    </>
  );
}
