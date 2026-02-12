import { Component, EventEmitter, Output, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartService, CartItem } from '../../../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();

  cartItems: CartItem[] = [];
  subtotal: number = 0;
  shipping: number = 0;
  tax: number = 0;
  total: number = 0;

  private subscription: Subscription = new Subscription();

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.subscription.add(
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
        this.updateTotals();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private updateTotals() {
    this.subtotal = this.cartService.getSubtotal();
    this.shipping = this.cartService.getShipping();
    this.tax = this.cartService.getTax();
    this.total = this.cartService.getTotal();
  }

  onClose() {
    this.close.emit();
  }

  checkout() {
    console.log('Proceeding to checkout with total:', this.total);
    // Logique de paiement ici
  }
}
