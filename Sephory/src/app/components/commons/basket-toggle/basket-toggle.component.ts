import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../../services/basket.service';
import { BasketProduct } from '../../../models/basketProduct.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket-toggle',
  imports: [CommonModule],
  templateUrl: './basket-toggle.component.html',
  styleUrl: './basket-toggle.component.scss'
})
export class BasketToggleComponent {
  count: number = 0;

  constructor(private basketService: BasketService, private router: Router) { }

  ngOnInit() {
    this.basketService.observeBasketContent().subscribe((content: BasketProduct[]) => this.onBasketContent(content));
  }
  onBasketContent(content: BasketProduct[]) {
    this.count = content.length;
  }
  onOpenBasket() {
    this.router.navigate(['/basket']);
  }
}
