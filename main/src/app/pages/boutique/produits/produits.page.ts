import { Component } from '@angular/core';
import { ProduitsListComponent } from '../../../components/boutique/produits-list/produits-list.component';
import { SidebarComponent } from '../../../components/boutique/sidebar/sidebar.component';

@Component({
  selector: 'app-produits-page',
  standalone: true,
  templateUrl: './produits.page.html',
  styleUrls: ['./produits.page.scss']
  ,
  imports: [ProduitsListComponent, SidebarComponent]
})
export class ProduitsPage {}
