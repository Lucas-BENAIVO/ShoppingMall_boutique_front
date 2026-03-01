import { Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { ProduitComponent } from '../produit/produit.component';
import { DetailsComponent } from '../produit/details/details.component';
import { BoutiquesListComponent } from '../boutique/boutiques-list.component';
import { BoutiqueDetailComponent } from '../boutique/boutique-detail.component';

export const LandingRoutes: Routes = [
  {
    path: 'boutiques',
    component: BoutiquesListComponent,
    data: {
      title: 'Boutiques',
      urls: [
        { title: 'Landing', url: '/landing' },
        { title: 'Boutiques', url: '/landing/boutiques' }
      ],
    },
  },
  {
    path: 'boutique/:id',
    component: BoutiqueDetailComponent,
    data: {
      title: 'Détails de la Boutique',
      urls: [
        { title: 'Landing', url: '/landing' },
        { title: 'Boutiques', url: '/landing/boutiques' },
        { title: 'Détails', url: '/landing/boutique/:id' }
      ],
    },
  },
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
