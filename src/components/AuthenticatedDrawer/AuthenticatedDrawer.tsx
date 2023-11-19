import { Drawer, Box, Typography, Divider, List } from '@mui/material';
import DrawerListAction from '../DrawerListAction/DrawerListAction';
import { AuthContext } from '@/context/AuthContext';
import { MouseEventHandler, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { LabeledRoute } from '@/types/LabeledRoute';
import eventPages from '@/utils/eventPages';

const adminRoutes: LabeledRoute[] = [
  { label: 'Gerenciar eventos', path: '/manage-events' },
  { label: 'Gerenciar ministrantes', path: '/manage-lecturers' }
];

export default function AuthenticatedDrawer({
  isDrawerOpen,
  handleDrawer
}: {
  isDrawerOpen: boolean;
  handleDrawer: MouseEventHandler;
}) {
  const { user, signOut } = useContext(AuthContext);
  const router = useRouter();

  const adminActions = adminRoutes.map((route, index) => (
    <DrawerListAction key={index} onClick={() => router.push(route.path)}>
      {route.label}
    </DrawerListAction>
  ));

  return (
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
        {user?.isAdmin && (
          <>
            <Divider />
            {adminActions}
          </>
        )}
        <Divider />
        <Box
          sx={{ display: { xs: 'flex', xl: 'none' }, flexDirection: 'column' }}
        >
          {eventPages.map((route, index) => (
            <DrawerListAction
              onClick={() => router.push(route.path)}
              key={index}
            >
              {route.label}
            </DrawerListAction>
          ))}
          <Divider />
        </Box>
        <DrawerListAction onClick={signOut}>Sair</DrawerListAction>
      </List>
    </Drawer>
  );
}
