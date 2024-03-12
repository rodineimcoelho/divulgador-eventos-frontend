import LecturerDto from '@/dto/lecturer.dto';
import { useLecturersService } from '@/services/lecturers.service';
import { getImageSource } from '@/utils/getImageSource';
import { yupResolver } from '@hookform/resolvers/yup';
import { UploadFile } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InferType } from 'yup';

const baseSchema = {
  presentation: yup.string().trim().required('Apresentação obrigatória.'),
  about: yup.string().trim().required('Sobre obrigatório.')
};

const addSchema = yup
  .object({
    ...baseSchema,
    image: yup.mixed().required('Imagem obrigatória')
  })
  .required();

const editSchema = yup
  .object({
    ...baseSchema,
    image: yup.mixed()
  })
  .required();

type AddInputs = InferType<typeof addSchema>;
type EditInputs = InferType<typeof editSchema>;

const emptyValues = {
  presentation: '',
  about: '',
  image: undefined
};

interface LecturerModalProps {
  isModalOpen: boolean;
  handleModal: (result: boolean) => void;
  mode: 'add' | 'edit';
  lecturer?: LecturerDto;
}

interface AddLecturerModalProps extends LecturerModalProps {
  mode: 'add';
}

interface EditLecturerModalProps extends LecturerModalProps {
  mode: 'edit';
  lecturer: LecturerDto;
}

export default function LecturerModal({
  isModalOpen,
  handleModal,
  lecturer,
  mode
}: AddLecturerModalProps | EditLecturerModalProps) {
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit
  } = useForm<AddInputs | EditInputs>({
    defaultValues:
      mode === 'edit'
        ? {
            presentation: lecturer.presentation,
            about: lecturer.about,
            image: undefined
          }
        : emptyValues,
    resolver: yupResolver(mode === 'edit' ? editSchema : addSchema),
    shouldFocusError: true
  });

  const image: File = watch('image') as File;

  const [imageURL, setImageURL] = useState<string | undefined>(
    mode === 'edit' ? getImageSource(lecturer.imageName) : undefined
  );

  const lecturersService = useLecturersService();

  const onSubmit: SubmitHandler<AddInputs | EditInputs> = async (
    data: AddInputs | EditInputs
  ) => {
    try {
      const { image, ...lecturerData } = data;

      switch (mode) {
        case 'add':
          await lecturersService.create({
            ...lecturerData,
            image: image as File
          });
          break;

        case 'edit':
          await lecturersService.update(lecturer.id, {
            ...lecturerData,
            image: image ? (image as File) : undefined
          });
          break;
      }

      handleModal(true);
    } catch (error) {
      handleModal(false);
    }
  };

  useEffect(() => {
    try {
      const url = URL.createObjectURL(image);
      setImageURL(url);
    } catch (error) {}
  }, [image]);

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModal}
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Paper sx={{ p: 3, m: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Adicionar ministrante
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="presentation"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.presentation}
                fullWidth
                margin="dense"
                label="Apresentação*"
                helperText={
                  <>
                    Exemplo: Prof. Dr. John Doe{' '}
                    {errors.presentation && (
                      <>
                        <br /> {errors.presentation.message}
                      </>
                    )}
                  </>
                }
                inputRef={field.ref}
                {...field}
              />
            )}
          />

          <Controller
            name="about"
            control={control}
            render={({ field }) => (
              <TextField
                multiline
                rows={4}
                error={!!errors.about}
                fullWidth
                margin="dense"
                label="Sobre*"
                helperText={errors.about?.message}
                inputRef={field.ref}
                {...field}
              />
            )}
          />

          <Box
            sx={{
              mt: 2,
              gap: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar
              alt="Imagem do ministrante"
              src={imageURL}
              sx={{ width: 128, height: 128 }}
            />

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Button
                    component="label"
                    variant="contained"
                    color={errors.image ? 'error' : 'primary'}
                    startIcon={<UploadFile />}
                  >
                    Enviar imagem*
                    <input
                      style={{
                        clip: 'rect(0 0 0 0)',
                        clipPath: 'inset(50%)',
                        height: 1,
                        overflow: 'hidden',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        whiteSpace: 'nowrap',
                        width: 1
                      }}
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        if (event.target.files) {
                          const image = event.target.files[0];
                          if (image) field.onChange(image);
                        }
                      }}
                    />
                  </Button>
                  <Typography
                    variant="caption"
                    color="error"
                    textAlign="center"
                  >
                    {errors.image?.message?.toString()}
                  </Typography>
                </Box>
              )}
            />
          </Box>

          <Button
            fullWidth
            sx={{ my: 2 }}
            variant="contained"
            type="submit"
            color="primary"
          >
            Confirmar
          </Button>
        </form>
      </Paper>
    </Modal>
  );
}
