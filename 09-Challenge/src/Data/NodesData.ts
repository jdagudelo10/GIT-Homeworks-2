import { NaryNode } from '../Classes/NodeN';
import { NaryTree } from '../Classes/TreeN';

export const root = new NaryNode({
  id: 'root',
  title: 'Menu',
  link: '/menu',
  children: [
    new NaryNode({
      id: 'account',
      title: 'Tu Cuenta',
      link: '/account',
    }),
    new NaryNode({
      id: 'subjects',
      title: 'Materias matriculadas',
      link: '/subjects',
      children: [
        new NaryNode({
          id: 'new-subjects',
          title: 'Materias matriculables',
          link: '/NewSubjects',
        }),
        new NaryNode({
          id: 'matricula',
          title: 'Activacion Matricula',
          link: '/activate-matricula',
        }),
      ],
    }),
    new NaryNode({
      id: 'support',
      title: 'ayuda y soporte',
      link: '/support',
    }),
  ],
});
