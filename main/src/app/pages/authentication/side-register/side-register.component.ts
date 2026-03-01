import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './side-register.component.html',
  styleUrls: ['./side-register.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private settings: CoreService, private router: Router, private authService: AuthService) {}

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.authService.register({
        fullName: this.form.value.fullName ?? '',
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
        role: 'USER'
      }).subscribe({
        next: (res) => {
          this.isLoading = false;
          
          // Le service gère automatiquement le stockage des tokens
          if (res?.accessToken) {
            this.successMessage = 'Compte créé avec succès ! Redirection...';
            setTimeout(() => {
              this.router.navigate(['/landing']);
            }, 1000);
          } else {
            // Fallback: rediriger vers login
            this.successMessage = 'Compte créé ! Connectez-vous.';
            setTimeout(() => {
              this.router.navigate(['/authentication/login']);
            }, 1500);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.error || err.error?.message || "Erreur lors de l'inscription";
        }
      });
    }
  }
}
