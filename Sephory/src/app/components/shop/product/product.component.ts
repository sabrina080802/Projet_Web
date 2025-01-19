import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../../services/basket.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product!: Product;
  @Input() basketManage: boolean = false;
  @Input() quantity: number = 0;

  constructor(private basket: BasketService, private auth: AuthService) { }

  async addProductToCart() {
    if (!this.auth.connected) {
      alert('Vous devez vous connecter pour ajouter un produit au panier');
    }
    else this.basket.addToBasket(this.product);
  }
  dropProductFromCart() {
    this.basket.dropFromBasket(this.product);
  }
}
