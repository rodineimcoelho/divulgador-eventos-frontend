import { useEventsService } from '@/services/events.service';
import { emptyToUndefined } from '@/utils/emptyToUndefined';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Event from '@/entities/event.entity';
import { useLecturersService } from '@/services/lecturers.service';
import { getImageSource } from '@/utils/getImageSource';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import { EventModality } from '@/types/EventModality';
import { InferType } from 'yup';
import LecturerDto from '@/dto/lecturer.dto';

const schema = yup
  .object({
    title: yup.string().trim().required('Título obrigatório.'),
    type: yup.string().trim().required('Tipo obrigatório.'),
    lecturerId: yup.string().trim().required('Ministrante obrigatório.'),
    modality: yup.string().trim().required('Modalidade obrigatória.'),
    abstract: yup.string().trim().required('Resumo obrigatório.'),
    startDate: yup
      .string()
      .required('Data inicial obrigatória.')
      .test(
        'endDateGreaterOrEqualThanStartDate',
        'A data final deve ser maior ou igual que a data inicial',
        (value, schema) => {
          const { endDate } = schema.parent;
          if (endDate) {
            const start = new Date(value);
            const end = new Date(endDate);

            return end.getTime() >= start.getTime();
          }

          return true;
        }
      ),
    endDate: yup
      .string()
      .required('Data final obrigatória.')
      .test(
        'endDateGreaterOrEqualThanStartDate',
        'A data final deve ser maior ou igual que a data inicial',
        (value, schema) => {
          const { startDate } = schema.parent;
          if (startDate) {
            const start = new Date(startDate);
            const end = new Date(value);

            return end.getTime() >= start.getTime();
          }

          return true;
        }
      ),
    location: yup.string().when('modality', (values, schema) => {
      const modality: EventModality = values[0];

      if (modality === 'IN_PERSON')
        return schema.trim().required('Local obrigatório.');

      return schema.transform(() => undefined);
    }),
    link: yup
      .string()
      .trim()
      .when('modality', (values, schema) => {
        const modality: EventModality = values[0];

        if (modality === 'ONLINE') return schema.required('Link obrigatório.');

        return schema.transform(emptyToUndefined);
      }),
    isVisible: yup.boolean().required('Visibilidade obrigatória')
  })
  .required();

type Inputs = InferType<typeof schema>;

const emptyValues = {
  title: '',
  type: '',
  lecturerId: '',
  modality: '',
  abstract: '',
  startDate: '',
  endDate: '',
  location: '',
  link: '',
  isVisible: false
};

interface EventModalProps {
  isModalOpen: boolean;
  handleModal: (result: boolean) => void;
  mode: 'add' | 'edit';
  event?: Event;
}

interface AddEventModalProps extends EventModalProps {
  mode: 'add';
}

interface EditEventModalProps extends EventModalProps {
  mode: 'edit';
  event: Event;
}

export default function EventModal({
  isModalOpen,
  handleModal,
  event,
  mode
}: AddEventModalProps | EditEventModalProps) {
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit
  } = useForm<Inputs>({
    defaultValues:
      mode === 'edit'
        ? {
            title: event.title,
            type: event.type,
            lecturerId: event.lecturerId,
            modality: event.modality,
            abstract: event.abstract,
            startDate: event.startDate,
            endDate: event.endDate,
            location: event.location ? event.location : '',
            link: event.link ? event.link : '',
            isVisible: event.isVisible
          }
        : emptyValues,
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    shouldFocusError: true
  });

  const modality = watch('modality');

  const [lecturers, setLecturers] = useState<LecturerDto[]>([]);
  const [selectedLecturer, setSelectedLecturer] = useState<LecturerDto | null>(
    mode === 'edit' ? event.lecturer! : null
  );
  const [lecturerSearch, setLecturerSearch] = useState<string>('');

  const eventsService = useEventsService();
  const lecturersService = useLecturersService();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      const { startDate, endDate, ...dataWithoutDates } = data;
      switch (mode) {
        case 'add':
          await eventsService.create({
            ...dataWithoutDates,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
          });
          break;
        case 'edit':
          await eventsService.update(event.id, {
            ...dataWithoutDates,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
          });
          break;
      }
      handleModal(true);
    } catch (error) {
      handleModal(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const newLecturers = await lecturersService.findAll();
      setLecturers(newLecturers);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
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
        <Paper
          sx={{
            p: 3,
            maxWidth: 'calc(100vw - 48px)',
            maxHeight: 'calc(100vh - 48px)',
            overflowY: 'auto'
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Adicionar evento
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  error={!!errors.title}
                  fullWidth
                  margin="dense"
                  label="Título*"
                  helperText={errors.title?.message}
                  inputRef={field.ref}
                  {...field}
                />
              )}
            />

            <Controller
              name="abstract"
              control={control}
              render={({ field }) => (
                <TextField
                  multiline
                  rows={4}
                  error={!!errors.abstract}
                  fullWidth
                  margin="dense"
                  label="Sobre*"
                  helperText={errors.abstract?.message}
                  inputRef={field.ref}
                  {...field}
                />
              )}
            />

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <FormControl margin="dense" error={!!errors.type} fullWidth>
                  <InputLabel id="type-label">Tipo*</InputLabel>
                  <Select labelId="type-label" label="Tipo*" {...field}>
                    <MenuItem value={'COURSE'}>Curso</MenuItem>
                    <MenuItem value={'LECTURE'}>Palestra</MenuItem>
                    <MenuItem value={'ROUND_TABLE'}>Mesa Redonda</MenuItem>
                    <MenuItem value={'SHORT_COURSE'}>Minicurso</MenuItem>
                    <MenuItem value={'WORKSHOP'}>Workshop</MenuItem>
                  </Select>
                  <FormHelperText>{errors.type?.message}</FormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="modality"
              control={control}
              render={({ field }) => (
                <FormControl margin="dense" error={!!errors.modality} fullWidth>
                  <InputLabel id="modality-label">Modalidade*</InputLabel>
                  <Select
                    labelId="modality-label"
                    label="Modalidade*"
                    {...field}
                  >
                    <MenuItem value={'IN_PERSON'}>Presencial</MenuItem>
                    <MenuItem value={'ONLINE'}>Online</MenuItem>
                  </Select>
                  <FormHelperText>{errors.modality?.message}</FormHelperText>
                </FormControl>
              )}
            />

            {modality === 'IN_PERSON' && (
              <Controller
                name="location"
                control={control}
                shouldUnregister
                render={({ field }) => (
                  <TextField
                    error={!!errors.location}
                    fullWidth
                    margin="dense"
                    label="Local*"
                    helperText={errors.location?.message}
                    inputRef={field.ref}
                    {...field}
                  />
                )}
              />
            )}

            <Controller
              name="lecturerId"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  value={selectedLecturer}
                  getOptionLabel={(props) => props.presentation}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(_event, newValue) => {
                    setSelectedLecturer(newValue);
                    field.onChange(newValue ? newValue.id : '');
                  }}
                  inputValue={lecturerSearch}
                  onInputChange={(_event, newValue) => {
                    setLecturerSearch(newValue);
                  }}
                  options={lecturers}
                  renderInput={(params) => (
                    <TextField
                      error={!!errors.lecturerId}
                      margin="dense"
                      helperText={errors.lecturerId?.message}
                      inputRef={field.ref}
                      {...params}
                      label="Ministrante*"
                    />
                  )}
                  renderOption={(props, option) => {
                    if (lecturers.length > 0) {
                      return (
                        <li {...props} key={option.id}>
                          <Avatar
                            sx={{ mr: 2 }}
                            src={getImageSource(option.imageName)}
                            alt={option.presentation}
                          />
                          {option.presentation}
                        </li>
                      );
                    }
                  }}
                />
              )}
            />

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Controller
                name="startDate"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <DateTimePicker
                    label="Data inicial"
                    value={dayjs(value)}
                    onChange={(value) => onChange(value?.toISOString())}
                    {...field}
                    inputRef={field.ref}
                    slotProps={{
                      textField: {
                        error: !!errors.startDate,
                        helperText: errors.startDate?.message,
                        margin: 'dense'
                      }
                    }}
                  />
                )}
              />

              <Controller
                name="endDate"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <DateTimePicker
                    label="Data final"
                    value={dayjs(value)}
                    onChange={(value) => onChange(value?.toISOString())}
                    {...field}
                    inputRef={field.ref}
                    slotProps={{
                      textField: {
                        error: !!errors.endDate,
                        helperText: errors.endDate?.message,
                        margin: 'dense'
                      }
                    }}
                  />
                )}
              />
            </Box>

            <Controller
              name="link"
              control={control}
              render={({ field }) => (
                <TextField
                  error={!!errors.link}
                  fullWidth
                  margin="dense"
                  label="Link"
                  helperText={
                    <>
                      Obrigatório para eventos online.
                      {errors.link && (
                        <>
                          <br /> {errors.link.message}
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
              name="isVisible"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      {...field}
                      inputRef={field.ref}
                    />
                  }
                  label="Visível?"
                />
              )}
            />

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
    </LocalizationProvider>
  );
}
