import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-disconnect',
  imports: [],
  templateUrl: './disconnect.component.html',
  styleUrl: './disconnect.component.scss'
})
export class DisconnectComponent {
  constructor(private router:Router, private authService:AuthService){
    this.authService.disconnect();
    this.router.navigate(['/']);
  }
}
