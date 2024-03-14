import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from 'src/app/admin/admin.page';

export const routes: Routes = [
  {
    path: '',
    component: AdminPage,
  },
  {
    path: 'questoes/adicionar',
    loadComponent: () =>
      import('./questoes/adicionar/adicionar.page').then(
        (m) => m.AdicionarPage
      ),
  },
];
