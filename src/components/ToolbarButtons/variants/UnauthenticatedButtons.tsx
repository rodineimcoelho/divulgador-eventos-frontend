import UnauthenticatedDrawer from '@/components/UnauthenticatedDrawer/UnauthenticatedDrawer';
import { Menu } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState, MouseEventHandler } from 'react';

export default function UnauthenticatedButtons() {
  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawer: MouseEventHandler = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Box sx={{ display: { xs: 'none', xl: 'flex' } }}>
        <Button
          color="inherit"
          variant="text"
          sx={{ mr: 2 }}
          onClick={() => router.push('/signin')}
        >
          Entrar
        </Button>
        <Button
          color="inherit"
          variant="outlined"
          onClick={() => router.push('/signup')}
        >
          Cadastre-se
        </Button>
      </Box>
      <Box sx={{ display: { xs: 'flex', xl: 'none' } }}>
        <IconButton
          size="large"
          aria-label="Menu"
          color="inherit"
          aria-haspopup="true"
          onClick={handleDrawer}
        >
          <Menu />
        </IconButton>
        <UnauthenticatedDrawer
          isDrawerOpen={isDrawerOpen}
          handleDrawer={handleDrawer}
        />
      </Box>
    </>
  );
}
