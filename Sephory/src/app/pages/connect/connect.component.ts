import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormGroupComponent } from '../../components/commons/form-group/form-group.component';

@Component({
  standalone: true,
  selector: 'app-connect',
  imports: [CommonModule, FormsModule, FormGroupComponent],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss'
})
export class ConnectComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {
    this.authService.observeConnectionState().subscribe((isConnected) => {
      if (isConnected)
        this.router.navigate(['/']);
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.email || !this.password) {
      return;
    }

    const result = await this.authService.connect(this.email, this.password);
    if (result.success) {
      alert('Vous êtes connecté !');
      this.router.navigate(['/']);
    }
  }
  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
