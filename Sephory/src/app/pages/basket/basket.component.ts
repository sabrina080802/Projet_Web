import { Component } from '@angular/core';
import { BasketProduct } from '../../models/basketProduct.model';
import { BasketService } from '../../services/basket.service';
import { ProductComponent } from '../../components/shop/product/product.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BasketRecapComponent } from '../../components/shop/basket-recap/basket-recap.component';

@Component({
  standalone: true,
  selector: 'app-basket',
  imports: [CommonModule, ProductComponent, BasketRecapComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  currentAction: number = 0;
  basketContent: BasketProduct[] = [];

  constructor(private authService: AuthService, private basketService: BasketService, private router: Router) { }

  ngOnInit() {
    this.authService.observeConnectionState().subscribe((isConnected) => {
      console.log(isConnected);
      if (isConnected == false) {
        this.router.navigate(['/connect']);
      }
    });

    this.basketService.observeBasketContent().subscribe((content) => {
      this.basketContent = content;
    });
  }
  trackByProductId(index: number, item: BasketProduct): number {
    return item.product.id;
  }
  command() {
    this.router.navigate(['/payment']);
  }
  backToShop() {
    this.router.navigate(['/products']);
  }
}
