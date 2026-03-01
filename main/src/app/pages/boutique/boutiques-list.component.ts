import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/landing/navbar/navbar.component';
import { FooterComponent } from '../../components/landing/footer/footer.component';
import { BoutiqueService, Boutique } from '../../services/boutique.service';

@Component({
  selector: 'app-boutiques-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './boutiques-list.component.html',
  styleUrls: ['./boutiques-list.component.scss']
})
export class BoutiquesListComponent implements OnInit {
  boutiques: Boutique[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private boutiqueService: BoutiqueService) {}

  ngOnInit(): void {
    this.loadBoutiques();
  }

  loadBoutiques(): void {
    this.isLoading = true;
    this.boutiqueService.getValidatedBoutiques().subscribe({
      next: (response) => {
        if (response.success) {
          this.boutiques = response.data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des boutiques';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
