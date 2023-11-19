import { LabeledRoute } from '@/types/LabeledRoute';

const eventPages: LabeledRoute[] = [
  {
    label: 'Todos os eventos',
    path: '/'
  },
  {
    label: 'Cursos',
    path: '/courses'
  },
  {
    label: 'Palestras',
    path: '/lectures'
  },
  {
    label: 'Mesas Redondas',
    path: '/round-tables'
  },
  {
    label: 'Minicursos',
    path: '/short-courses'
  },
  {
    label: 'Workshops',
    path: '/workshops'
  }
];

export default eventPages;
