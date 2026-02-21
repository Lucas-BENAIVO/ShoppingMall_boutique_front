import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProduitsPage } from './produits/produits.page';
import { CommandesPageComponent } from './commandes/commandes.page';

export const BoutiqueRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'produits',
    component: ProduitsPage,
  },
  {
    path: 'commandes',
    component: CommandesPageComponent,
  },
];
