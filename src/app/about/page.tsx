import { Container, Typography } from '@mui/material';

export default function AboutPage() {
  return (
    <Container
      fixed
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        my: 4
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        sx={{ textAlign: 'center', mb: 2 }}
      >
        Sobre
      </Typography>
      <Typography variant="body1" paragraph>
        Projeto desenvolvido por:
      </Typography>
      <Typography variant="h6" component="div">
        Rodinei Martins Coelho
      </Typography>
      <Typography variant="h6" component="div">
        Ivone Penque Matsuno Yugoshi
      </Typography>
    </Container>
  );
}
