import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/commons/menu/menu.component';
import { BasketToggleComponent } from './components/commons/basket-toggle/basket-toggle.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, BasketToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Sephory';
}
