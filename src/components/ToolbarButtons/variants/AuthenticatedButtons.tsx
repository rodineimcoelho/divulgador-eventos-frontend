import AuthenticatedDrawer from '@/components/AuthenticatedDrawer/AuthenticatedDrawer';
import { AccountCircle } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { MouseEventHandler, useState } from 'react';

export default function AuthenticatedButtons() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
      <AuthenticatedDrawer
        isDrawerOpen={isDrawerOpen}
        handleDrawer={handleDrawer}
      />
    </>
  );
}
