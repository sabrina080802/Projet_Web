import { Component } from '@angular/core';
import { BasketRecapComponent } from '../../components/shop/basket-recap/basket-recap.component';
import { CommonModule } from '@angular/common';
import { SelectMethodComponent } from '../../components/payment/select-method/select-method.component';
import { CreateCardComponent } from '../../components/payment/create-card/create-card.component';
import { ConfirmPaymentComponent } from '../../components/payment/confirm-payment/confirm-payment.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-payment',
  imports: [BasketRecapComponent, CommonModule, SelectMethodComponent, CreateCardComponent, ConfirmPaymentComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  currentStep: string = 'select-method';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.connected == false) {
      this.router.navigate(['/connect']);
    }
  }
  setStep(step: string): void {
    this.currentStep = step;
    if (step == 'end') {
      this.router.navigate(['/products']);
      alert('Merci pour votre achat, à bientôt');
    }
  }
}
