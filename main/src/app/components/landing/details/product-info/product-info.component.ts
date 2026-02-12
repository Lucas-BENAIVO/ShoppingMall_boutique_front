import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  productId: number = 1;
  productName: string = 'Base Crop';
  productCategory: string = 'BODY WEAR';
  price: number = 50.00;
  description: string = 'Un essentiel minimaliste conçu pour le mouvement et le confort. Fabriqué en tissu de performance italien ultra-doux — respirant, sculptant et flexible en mouvement. Parfait pour les séances de studio, l\'entraînement ou le calme quotidien.';
  productImage: string = '';
  
  colors: any[] = [
    { name: 'Noir', value: '#9aff00', selected: true },
    { name: 'Blanc', value: '#ffffff', selected: false },
    { name: 'Gris', value: '#808080', selected: false }
  ];

  sizes: any[] = [
    { name: 'XXXL', selected: false },
    { name: 'XXS', selected: false },
    { name: 'XS', selected: true },
    { name: 'S', selected: false },
    { name: 'M', selected: false },
    { name: 'L', selected: false },
    { name: 'XL', selected: false }
  ];

  quantity: number = 2;
  showAddedNotification: boolean = false;

  constructor(private cartService: CartService) {}

  selectColor(color: any) {
    this.colors.forEach(c => c.selected = false);
    color.selected = true;
  }

  selectSize(size: any) {
    this.sizes.forEach(s => s.selected = false);
    size.selected = true;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  addToCart() {
    const selectedColor = this.colors.find(c => c.selected);
    const selectedSize = this.sizes.find(s => s.selected);
    
    const product = {
      id: this.productId,
      name: this.productName,
      category: this.productCategory,
      price: this.price,
      image: this.productImage
    };

    // Ajouter au panier pour chaque quantité
    for (let i = 0; i < this.quantity; i++) {
      this.cartService.addToCart(
        product,
        selectedSize?.name || 'XS',
        selectedColor?.name || 'Black'
      );
    }

    // Afficher notification
    this.showAddedNotification = true;
    setTimeout(() => {
      this.showAddedNotification = false;
    }, 2000);

    // Réinitialiser la quantité
    this.quantity = 1;
  }
}
