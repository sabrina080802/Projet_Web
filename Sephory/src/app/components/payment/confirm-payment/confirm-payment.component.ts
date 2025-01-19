import { Component, EventEmitter, Output } from '@angular/core';
import { BasketService } from '../../../services/basket.service';

@Component({
  selector: 'app-confirm-payment',
  imports: [],
  templateUrl: './confirm-payment.component.html',
  styleUrl: './confirm-payment.component.scss'
})
export class ConfirmPaymentComponent {
  @Output() stepChange = new EventEmitter<string>();

  constructor(private basket: BasketService) { }

  onConfirmPayment() {
    this.basket.clearBasket();
    this.stepChange.emit('end');
  }
}
