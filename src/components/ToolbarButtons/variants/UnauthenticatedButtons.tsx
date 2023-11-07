import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function UnauthenticatedButtons() {
  const router = useRouter();

  return (
    <>
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
    </>
  );
}
