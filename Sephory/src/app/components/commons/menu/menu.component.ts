import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { BasketService } from '../../../services/basket.service';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  count!: Observable<number>;
  isConnected = false;

  constructor(
    private authService: AuthService,
    private basketService: BasketService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkConnection();
  }
  checkConnection(): void {
    this.authService.observeConnectionState().subscribe(response => {
      this.isConnected = response;
    });
  }
}
