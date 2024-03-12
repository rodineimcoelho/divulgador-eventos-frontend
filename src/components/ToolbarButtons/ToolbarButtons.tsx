'use client';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import ButtonsSkeleton from './variants/ButtonsSkeleton';
import UnauthenticatedButtons from './variants/UnauthenticatedButtons';
import AuthenticatedButtons from './variants/AuthenticatedButtons';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import publicPages from '@/utils/publicPages';

export default function ToolbarButtons() {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  if (isAuthenticated === undefined) return <ButtonsSkeleton />;

  return (
    <>
      <Box sx={{ display: { xs: 'none', xl: 'flex' } }}>
        {publicPages.map((route, index) => (
          <Button
            color="inherit"
            variant="text"
            sx={{ mr: 2 }}
            onClick={() => router.push(route.path)}
            key={index}
          >
            {route.label}
          </Button>
        ))}
      </Box>
      {isAuthenticated ? <AuthenticatedButtons /> : <UnauthenticatedButtons />}
    </>
  );
}
