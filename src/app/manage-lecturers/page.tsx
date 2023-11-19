'use client';
import LecturerModal from '@/components/LecturerModal/LecturerModal';
import LecturerListItem from '@/components/LecturerListItem/LecturerListItem';
import { useLecturersService } from '@/services/lecturers.service';
import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Fab,
  List,
  Typography
} from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import LecturerDto from '@/dto/lecturer.dto';

export default function ManageLecturers() {
  const [isAddingLecturer, setIsAddingLecturer] = useState(false);
  const [lecturerToEdit, setLecturerToEdit] = useState<LecturerDto>();
  const [lecturerToDeleteId, setLecturerToDeleteId] = useState<string>();
  const [lecturers, setLecturers] = useState<LecturerDto[]>();
  const lecturersService = useLecturersService();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchData() {
    const lecturers = await lecturersService.findAll();
    setLecturers(lecturers);
  }

  async function removeLecturer() {
    await lecturersService.remove(lecturerToDeleteId!);
    if (lecturers) {
      const index = lecturers?.findIndex(
        (lecturer) => lecturer.id === lecturerToDeleteId
      );
      const newLecturers = [...lecturers];
      newLecturers.splice(index, 1);
      setLecturers(newLecturers);
    }
    setLecturerToDeleteId(undefined);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        sx={{
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          p: 4,
          gap: 3
        }}
      >
        <Typography component="h1" variant="h4">
          Gerenciar Ministrantes
        </Typography>

        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {lecturers &&
            lecturers?.map((lecturer, index) => (
              <React.Fragment key={lecturer.id}>
                {index > 0 && <Divider />}
                <LecturerListItem
                  lecturer={lecturer}
                  onRemove={() => setLecturerToDeleteId(lecturer.id)}
                  onEdit={() => {
                    setLecturerToEdit(lecturer);
                  }}
                />
              </React.Fragment>
            ))}
        </List>

        <Button
          variant="contained"
          color="primary"
          aria-label="add"
          onClick={() => setIsAddingLecturer(true)}
        >
          <Add sx={{ mr: 1 }} />
          Adicionar ministrante
        </Button>
      </Box>

      {isAddingLecturer && (
        <LecturerModal
          isModalOpen
          mode="add"
          handleModal={(result) => {
            setIsAddingLecturer(false);
            if (result) fetchData();
          }}
        />
      )}

      {lecturerToEdit && (
        <LecturerModal
          isModalOpen
          mode="edit"
          lecturer={lecturerToEdit}
          handleModal={(result) => {
            setLecturerToEdit(undefined);
            if (result) fetchData();
          }}
        />
      )}

      {lecturerToDeleteId && (
        <Dialog open={!!lecturerToDeleteId}>
          <DialogTitle>Quer remover o ministrante?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setLecturerToDeleteId(undefined)}>
              Cancelar
            </Button>
            <Button onClick={removeLecturer}>Confirmar</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
