import { Component, EventEmitter, Output, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartService, CartItem } from '../../../../services/cart.service';
import { OrderService, CreateOrderRequest } from '../../../../services/order.service';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, CartItemComponent],
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

  // Checkout state
  showCheckoutForm = false;
  showConfirmation = false;
  deliveryType: 'RETRAIT' | 'LIVRAISON' = 'RETRAIT';
  isProcessing = false;
  orderSuccess = false;
  orderError = '';
  orderId = '';

  private subscription: Subscription = new Subscription();

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

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
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser) {
      // Rediriger vers login si pas connecté
      this.onClose();
      this.router.navigate(['/authentication/login']);
      return;
    }

    // Afficher le formulaire de checkout
    this.showCheckoutForm = true;
  }

  cancelCheckout() {
    this.showCheckoutForm = false;
    this.showConfirmation = false;
    this.orderError = '';
  }

  // Passer à l'étape de confirmation
  proceedToConfirmation() {
    this.showConfirmation = true;
  }

  // Revenir au choix de livraison
  backToDeliveryChoice() {
    this.showConfirmation = false;
  }

  confirmOrder() {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser || this.cartItems.length === 0) {
      return;
    }

    // Utiliser _id ou id selon ce qui est disponible
    const userId = currentUser._id || currentUser.id;
    if (!userId) {
      this.orderError = 'Session expirée. Veuillez vous reconnecter.';
      return;
    }

    this.isProcessing = true;
    this.orderError = '';

    // Construire les items de la commande
    const orderItems = this.cartItems.map(item => ({
      productId: item.productId,
      boutiqueId: item.boutiqueId || 'default-boutique',
      quantity: item.quantity,
      price: item.price
    }));

    const orderData: CreateOrderRequest = {
      userId: userId,
      items: orderItems,
      totalAmount: this.total,
      deliveryType: this.deliveryType
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        if (response.success) {
          this.orderSuccess = true;
          this.orderId = response.data._id;
          this.cartService.clearCart();
          this.showCheckoutForm = false;
        } else {
          this.orderError = response.message || 'Erreur lors de la commande';
        }
        this.isProcessing = false;
      },
      error: (err) => {
        console.error('Order error:', err);
        this.orderError = err.error?.message || 'Une erreur est survenue';
        this.isProcessing = false;
      }
    });
  }

  continueShopping() {
    this.orderSuccess = false;
    this.onClose();
  }

  clearCart() {
    if (confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
      this.cartService.clearCart();
    }
  }
}
