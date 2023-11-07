import { Skeleton, Button } from '@mui/material';

export default function ButtonsSkeleton() {
  return (
    <>
      <Skeleton variant="rounded" sx={{ mr: 2 }}>
        <Button variant="text">Entrar</Button>
      </Skeleton>

      <Skeleton variant="rounded">
        <Button variant="outlined">Cadastre-se</Button>
      </Skeleton>
    </>
  );
}
