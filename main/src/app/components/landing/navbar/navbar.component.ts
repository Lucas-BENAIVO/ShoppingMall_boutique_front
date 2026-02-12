import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from '../cart/shopping-cart/shopping-cart.component';
import { CartService } from '../../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ShoppingCartComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isCartOpen = false;
  cartCount = 0;
  private subscription: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.subscription.add(
      this.cartService.cartCount$.subscribe(count => {
        this.cartCount = count;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  closeCart() {
    this.isCartOpen = false;
  }
}
