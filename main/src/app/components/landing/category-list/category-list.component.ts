import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  categories = [
    { name: 'Ensemble canapé de luxe', icon: 'arrow' },
    { name: 'Mobilier de bureau', icon: 'edit' },
    { name: 'Mobilier de chambre', icon: 'edit' },
    { name: 'Mobilier de salle à manger', icon: 'edit' }
  ];
}
