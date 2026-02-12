import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { ProduitComponent } from './produit/produit.component';

export const PagesRoutes: Routes = [
  {
    path: 'produit',
    component: ProduitComponent,
    data: {
      title: 'Produit',
      urls: [
        { title: 'Produit', url: '/produit' }
      ],
    },
  },
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Starter' },
      ],
    },
  },
];
