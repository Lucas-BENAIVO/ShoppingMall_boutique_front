import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandesListComponent } from '../../../components/boutique/commandes-list/commandes-list.component';
import { SidebarComponent } from '../../../components/boutique/sidebar/sidebar.component';

@Component({
  selector: 'app-commandes-page',
  standalone: true,
  imports: [CommonModule, CommandesListComponent, SidebarComponent],
  templateUrl: './commandes.page.html',
  styleUrls: ['./commandes.page.scss']
})
export class CommandesPageComponent {}