import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/boutique/sidebar/sidebar.component';
import { BoutiqueNavbarComponent } from '../../../components/boutique/boutique-navbar/boutique-navbar.component';
import { FooterComponent } from '../../../components/boutique/footer/footer.component';
import { StatCardComponent } from '../../../components/boutique/stat-card/stat-card.component';
import { TopProduitsComponent } from '../../../components/boutique/top-produits/top-produits.component';
import { VentesParJourComponent } from '../../../components/boutique/ventes-par-jour/ventes-par-jour.component';
import { TopClientsComponent } from '../../../components/boutique/top-clients/top-clients.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, BoutiqueNavbarComponent, FooterComponent, StatCardComponent, TopProduitsComponent, VentesParJourComponent, TopClientsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats = [
    {
      icon: 'payments',
      iconColor: '#5d87ff',
      label: 'Revenu total',
      value: '24 580 $',
      change: '+12,5%',
      changeType: 'positive' as const,
      changeIcon: 'trending_up'
    },
    {
      icon: 'shopping_bag',
      iconColor: '#ffc107',
      label: 'Commandes totales',
      value: '142',
      actionLabel: '8 en attente',
      actionColor: '#ffc107',
      changeType: 'neutral' as const
    },
    {
      icon: 'inventory_2',
      iconColor: '#13deb9',
      label: 'Produits listés',
      value: '24',
      actionLabel: '3 stock faible',
      actionColor: '#fa896b',
      changeType: 'negative' as const
    },
    {
      icon: 'star',
      iconColor: '#ff5ca8',
      label: 'Note moyenne',
      value: '4.8',
      change: '+0.3',
      changeType: 'positive' as const,
      changeIcon: 'trending_up'
    }
  ];
}
