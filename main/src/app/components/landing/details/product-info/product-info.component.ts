import { Component, Input, OnChanges, SimpleChanges, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../../services/cart.service';
import { Product } from '../../../../services/product.service';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnChanges {
  @Input() product: Product | null = null;

  productId: string = '';
  productBoutiqueId: string = '';
  productName: string = 'Produit';
  productCategory: string = 'PRODUIT';
  price: number = 0;
  description: string = '';
  productImage: string = '';
  
  colors: any[] = [
    { name: 'Noir', value: '#000000', selected: true },
    { name: 'Blanc', value: '#ffffff', selected: false },
    { name: 'Gris', value: '#808080', selected: false }
  ];

  sizes: any[] = [
    { name: 'XS', selected: false },
    { name: 'S', selected: false },
    { name: 'M', selected: true },
    { name: 'L', selected: false },
    { name: 'XL', selected: false }
  ];

  quantity: number = 1;
  showAddedNotification: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.initializeFromProduct();
    }
  }

  private initializeFromProduct(): void {
    if (this.product) {
      this.productId = this.product._id;
      this.productBoutiqueId = this.product.boutiqueId || '';
      this.productName = this.product.name;
      this.productCategory = this.product.category || 'PRODUIT';
      this.price = this.product.price;
      this.description = this.product.description || 'Aucune description disponible.';
      this.productImage = this.product.images?.[0] || this.product.image || '';
    }
  }

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
      boutiqueId: this.productBoutiqueId,
      name: this.productName,
      category: this.productCategory,
      price: this.price,
      image: this.productImage
    };

    // Ajouter au panier pour chaque quantité
    for (let i = 0; i < this.quantity; i++) {
      this.cartService.addToCart(
        product,
        selectedSize?.name || 'M',
        selectedColor?.name || 'Noir'
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
