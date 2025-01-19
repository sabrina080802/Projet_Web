import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroupComponent } from '../../components/commons/form-group/form-group.component';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule, FormGroupComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstname: string = '';
  lastname: string = '';

  constructor(private router: Router, private authService: AuthService) {
    this.authService.observeConnectionState().subscribe((isConnected) => {
      if (isConnected)
        this.router.navigate(['/']);
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.email || !this.password || !this.confirmPassword || !this.firstname || !this.lastname) {
      return;
    }

    if (this.password != this.confirmPassword) {
      return;
    }

    const result = await this.authService.register(this.firstname, this.lastname, this.email, this.password);
    if (result.success) {
      alert('Inscription réussie !');
      this.router.navigate(['/connect']);
    }
    else {
      alert('L\'inscription a echoué\r\n' + result.error);
    }
  }
  redirectToConnect() {
    this.router.navigate(['/connect']);
  }
}
