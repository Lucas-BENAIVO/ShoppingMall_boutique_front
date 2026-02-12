import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from '../category-list/category-list.component';

@Component({
  selector: 'app-furnish-corner',
  standalone: true,
  imports: [CommonModule, CategoryListComponent],
  templateUrl: './furnish-corner.component.html',
  styleUrls: ['./furnish-corner.component.scss']
})
export class FurnishCornerComponent {}
