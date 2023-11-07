import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import ToolbarButtons from '../ToolbarButtons/ToolbarButtons';

export default function ToolbarItems() {
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

      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          Divulgador de Eventos
        </Typography>
      </Box>

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

      <ToolbarButtons />
    </>
  );
}
