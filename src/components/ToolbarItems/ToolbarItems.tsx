'use client';

import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ToolbarItems() {
  const router = useRouter();

  return (
    <>
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          height: '48px',
          my: 1,
          mr: 2
        }}
      >
        <Image
          src="/ufms_logo_positivo_rgb.png"
          alt="Logo da ufms"
          width={1620}
          height={2234}
          quality={100}
          style={{
            objectFit: 'contain',
            height: '100%',
            width: 'auto'
          }}
        />
      </Box>
      <Typography
        variant="h6"
        component={Link}
        href="/"
        sx={{
          flexGrow: 1,
          color: 'inherit',
          textDecoration: 'none',
          display: { xs: 'none', sm: 'flex' }
        }}
      >
        Divulgador de Eventos
      </Typography>

      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexGrow: 1,
          height: '48px',
          my: 1,
          mr: 2
        }}
      >
        <Image
          src="/ufms_logo_positivo_rgb.png"
          alt="Logo da ufms"
          width={1620}
          height={2234}
          quality={100}
          style={{
            objectFit: 'contain',
            height: '100%',
            width: 'auto'
          }}
        />
      </Box>

      <Button
        color="inherit"
        variant="outlined"
        onClick={() => router.push('/signup')}
      >
        Cadastre-se
      </Button>
    </>
  );
}
