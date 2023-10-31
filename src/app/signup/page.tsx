'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Container, Paper, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InferType } from 'yup';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';

const schema = yup
  .object({
    fullName: yup.string().trim().required('Nome completo obrigatório.'),
    email: yup
      .string()
      .trim()
      .required('E-mail obrigatório.')
      .email('E-mail inválido.'),
    password: yup
      .string()
      .trim()
      .required('Senha obrigatória.')
      .min(8, 'A senha deve ter no mínimo 8 caracteres.'),
    passwordConfirmation: yup
      .string()
      .required('Confirme sua senha.')
      .test({
        test: (value, object) => object.parent.password === value,
        message: 'Senhas não são iguais.'
      })
  })
  .required();

export type Inputs = InferType<typeof schema>;

export default function SignUp() {
  const defaultValues: Inputs = {
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  const {
    control,
    formState: { errors, isSubmitting, isDirty },
    setError,
    reset,
    handleSubmit
  } = useForm<Inputs>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onBlur',
    shouldFocusError: true
  });

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<
    boolean | undefined
  >(undefined);

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const error = await res.json();
        let errorHandled = false;

        if ((error.message as string[]).includes('email already in use')) {
          setError('email', {
            message: 'Este e-mail já está sendo utilizado.'
          });
          errorHandled = true;
        }

        if (!errorHandled) throw error;
        return setIsSubmitSuccessful(false);
      }

      setIsSubmitSuccessful(true);
      reset(defaultValues, { keepDefaultValues: true });
    } catch (error: any) {
      setIsSubmitSuccessful(false);
    }
  };

  useEffect(() => {
    if (isDirty) setIsSubmitSuccessful(undefined);
  }, [isDirty]);

  return (
    <Container>
      <Paper sx={{ my: 3, p: 3 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 3 }}>
          Cadastro de Usuário
        </Typography>

        <Typography variant="caption">
          Campos com (*) são obrigatórios
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{ scrollMarginTop: '100%' }}
                error={!!errors.fullName}
                fullWidth
                margin="dense"
                label="Nome completo*"
                helperText={errors.fullName?.message}
                inputRef={field.ref}
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.email}
                margin="dense"
                fullWidth
                label="E-mail*"
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
                helperText={
                  errors.password
                    ? errors.password.message
                    : 'A senha deve ter no mínimo 8 caracteres.'
                }
                label="Senha*"
                inputRef={field.ref}
                {...field}
              />
            )}
          />
          <Controller
            name="passwordConfirmation"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.passwordConfirmation}
                margin="dense"
                type="password"
                fullWidth
                helperText={errors.passwordConfirmation?.message}
                label="Confirme sua senha*"
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
            color={isSubmitSuccessful && !isDirty ? 'success' : 'primary'}
          >
            {isSubmitSuccessful && !isDirty
              ? 'Usuário cadastrado'
              : 'Confirmar'}
          </LoadingButton>

          {isSubmitSuccessful !== undefined && !isSubmitSuccessful && (
            <Alert severity="error">
              Não foi possível realizar o cadastro.
            </Alert>
          )}
        </form>
      </Paper>
    </Container>
  );
}
