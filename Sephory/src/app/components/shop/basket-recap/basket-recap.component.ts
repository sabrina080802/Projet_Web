import { Component, Input } from '@angular/core';
import { BasketService } from '../../../services/basket.service';
import { BasketProduct } from '../../../models/basketProduct.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket-recap',
  imports: [CommonModule],
  templateUrl: './basket-recap.component.html',
  styleUrl: './basket-recap.component.scss'
})
export class BasketRecapComponent {
  basketContent: BasketProduct[] = [];
  total: number = 0;
  @Input() navigateToCommand: boolean = true;

  constructor(private basketService: BasketService, private router: Router) { }

  ngOnInit() {
    this.basketService.observeBasketContent().subscribe((content) => {
      this.basketContent = content;
      this.total = this.basketContent.reduce((acc, value) => acc + (value.quantity * value.product.price) / 100, 0);
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
