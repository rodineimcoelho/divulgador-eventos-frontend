'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Paper, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InferType } from 'yup';
import { LoadingButton } from '@mui/lab';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const schema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required('E-mail obrigatório.')
      .email('E-mail inválido.'),
    password: yup.string().trim().required('Senha obrigatória.')
  })
  .required();

export type Inputs = InferType<typeof schema>;

export default function SignUp() {
  const defaultValues: Inputs = {
    email: '',
    password: ''
  };

  const {
    control,
    formState: { errors, isSubmitting },
    setError,
    handleSubmit
  } = useForm<Inputs>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onBlur',
    shouldFocusError: true
  });

  const { signIn } = useContext(AuthContext);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      await signIn(data);
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (error.response?.status === 401) {
          setError('email', { message: 'E-mail ou senha incorretos.' });
          setError('password', { message: 'E-mail ou senha incorretos.' });
          return;
        }
      }
    }
  };

  return (
    <Container fixed>
      <Paper sx={{ my: 4, p: 3 }}>
        <Typography
          component="h1"
          variant="h3"
          sx={{ textAlign: 'center', mb: 3 }}
        >
          Entrar
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.email}
                margin="dense"
                fullWidth
                label="E-mail"
                autoComplete="email"
                helperText={errors.email?.message}
                inputRef={field.ref}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.password}
                margin="dense"
                type="password"
                fullWidth
                helperText={errors.password?.message}
                label="Senha"
                inputRef={field.ref}
                {...field}
              />
            )}
          />

          <LoadingButton
            fullWidth
            loading={isSubmitting}
            sx={{ my: 2 }}
            variant="contained"
            type="submit"
          >
            Entrar
          </LoadingButton>
        </form>
      </Paper>
    </Container>
  );
}
