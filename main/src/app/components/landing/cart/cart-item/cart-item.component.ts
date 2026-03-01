import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() item!: CartItem;

  constructor(private cartService: CartService) {}

  decreaseQuantity() {
    if (this.item.quantity > 1) {
      this.cartService.updateQuantity(this.item.id, this.item.quantity - 1);
    }
  }

  increaseQuantity() {
    this.cartService.updateQuantity(this.item.id, this.item.quantity + 1);
  }

  removeItem() {
    this.cartService.removeItem(this.item.id);
  }
}
