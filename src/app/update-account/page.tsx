'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Container, Paper, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InferType } from 'yup';
import { LoadingButton } from '@mui/lab';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { emptyToUndefined } from '@/utils/emptyToUndefined';
import usersService from '@/services/users.service';
import { isAxiosError } from 'axios';

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
      .min(8, 'A senha deve ter no mínimo 8 caracteres.')
      .transform(emptyToUndefined),
    passwordConfirmation: yup.string().when('password', (values, schema) => {
      const [password] = values;

      if (password)
        return schema
          .trim()
          .required('Confirme sua senha.')
          .test({
            test: (value, object) => object.parent.password === value,
            message: 'Senhas não são iguais.'
          });

      return schema.transform(() => undefined);
    }),
    currentPassword: yup.string().trim().required('Senha obrigatória.')
  })
  .required();

export type Inputs = InferType<typeof schema>;

export default function UpdateAccount() {
  const { user, signIn } = useContext(AuthContext);

  const defaultValues: Inputs = {
    fullName: user?.fullName!,
    email: user?.email!,
    password: '',
    passwordConfirmation: '',
    currentPassword: ''
  };

  const {
    control,
    formState: { errors, isSubmitting, isDirty },
    watch,
    setError,
    reset,
    handleSubmit
  } = useForm<Inputs>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onBlur',
    shouldFocusError: true
  });

  const password = watch('password');

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>();
  const [isSubmitErrorHandled, setIsSubmitErrorHandled] = useState<boolean>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      await usersService.update(user?.id!, {
        ...data,
        email: data.email !== user?.email ? data.email : undefined
      });

      if (data.password || data.email !== user?.email) {
        const signInEmail =
          data.email !== user?.email ? data.email : user.email;
        const signInPassword = data.password
          ? data.password
          : data.currentPassword;
        await signIn({ email: signInEmail, password: signInPassword });
      }

      setIsSubmitSuccessful(true);
      setIsSubmitErrorHandled(undefined);
      reset(defaultValues, { keepDefaultValues: true });
    } catch (error: any) {
      let errorHandled = false;
      if (
        isAxiosError(error) &&
        error.response &&
        [400, 401].includes(error.response.status)
      ) {
        const errorMessage = error.response.data.message as string[];

        if (errorMessage.includes('email already in use')) {
          setError('email', {
            message: 'Este e-mail já está sendo utilizado.'
          });
          errorHandled = true;
        }

        if (errorMessage.includes('wrong password')) {
          setError('currentPassword', {
            message: 'Senha incorreta.'
          });
          errorHandled = true;
        }
      }

      setIsSubmitErrorHandled(errorHandled);
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
          Editar Conta
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
                label="Nova senha"
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
                disabled={!password}
                error={!!errors.passwordConfirmation}
                margin="dense"
                type="password"
                fullWidth
                helperText={errors.passwordConfirmation?.message}
                label="Confirme sua senha"
                inputRef={field.ref}
                {...field}
              />
            )}
          />

          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.currentPassword}
                margin="dense"
                type="password"
                fullWidth
                helperText={errors.currentPassword?.message}
                label="Senha atual*"
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
            {isSubmitSuccessful && !isDirty ? 'Alterações salvas' : 'Confirmar'}
          </LoadingButton>

          {isSubmitErrorHandled !== undefined && !isSubmitErrorHandled && (
            <Alert severity="error">
              Não foi possível realizar o cadastro.
            </Alert>
          )}
        </form>
      </Paper>
    </Container>
  );
}
