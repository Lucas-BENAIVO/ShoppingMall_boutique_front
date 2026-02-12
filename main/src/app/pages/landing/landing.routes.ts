import { Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { ProduitComponent } from '../produit/produit.component';
import { DetailsComponent } from '../produit/details/details.component';

export const LandingRoutes: Routes = [
  {
    path: 'produit/:id',
    component: DetailsComponent,
    data: {
      title: 'Détails du Produit',
      urls: [
        { title: 'Landing', url: '/landing' },
        { title: 'Produit', url: '/landing/produit' },
        { title: 'Détails', url: '/landing/produit/:id' }
      ],
    },
  },
  {
    path: 'produit',
    component: ProduitComponent,
    data: {
      title: 'Produit',
      urls: [
        { title: 'Landing', url: '/landing' },
        { title: 'Produit', url: '/landing/produit' }
      ],
    },
  },
  {
    path: '',
    component: LandingComponent,
    data: {
      title: 'Landing',
      urls: [
        { title: 'Landing', url: '/landing' },
      ],
    },
  },
];
