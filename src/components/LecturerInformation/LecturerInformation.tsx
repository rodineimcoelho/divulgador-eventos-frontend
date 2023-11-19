import { Typography } from '@mui/material';
import LecturerDto from '@/dto/lecturer.dto';

export default function LecturerInformation({
  lecturer
}: {
  lecturer: LecturerDto;
}) {
  return (
    <>
      <Typography variant="h6" component="div">
        Sobre
      </Typography>
      <Typography variant="body1" paragraph>
        {lecturer.about}
      </Typography>
    </>
  );
}
