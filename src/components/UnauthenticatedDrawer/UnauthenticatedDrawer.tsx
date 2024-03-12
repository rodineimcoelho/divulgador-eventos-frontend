import { Drawer, Divider, List, Button, Box } from '@mui/material';
import DrawerListAction from '../DrawerListAction/DrawerListAction';
import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import publicPages from '@/utils/publicPages';

export default function UnauthenticatedDrawer({
  isDrawerOpen,
  handleDrawer
}: {
  isDrawerOpen: boolean;
  handleDrawer: MouseEventHandler;
}) {
  const router = useRouter();

  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawer}>
      <List disablePadding sx={{ flexGrow: 1 }}>
        {publicPages.map((route, index) => (
          <DrawerListAction onClick={() => router.push(route.path)} key={index}>
            {route.label}
          </DrawerListAction>
        ))}
        <Divider />
      </List>
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 1, gap: 1 }}>
        <Button
          color="primary"
          variant="text"
          onClick={() => router.push('/signin')}
        >
          Entrar
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => router.push('/signup')}
        >
          Cadastre-se
        </Button>
      </Box>
    </Drawer>
  );
}
