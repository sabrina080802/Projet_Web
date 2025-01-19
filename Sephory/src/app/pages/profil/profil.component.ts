import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormGroupComponent } from '../../components/commons/form-group/form-group.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-profil',
  imports: [CommonModule, FormsModule, FormGroupComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstname: string = '';
  lastname: string = '';
  phone: string = '';
  address: string = '';
  country: string = '';
  city: string = '';
  postalCode: string = '';

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.authService.observeConnectionState().subscribe(isConnected => {
      if (!isConnected) {
        this.router.navigate(['/']);
        return;
      }


      const user = this.authService.getUser()!;
      this.email = user.email;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.phone = user.phone;
      this.address = user.address;
      this.country = user.country;
      this.city = user.city;
      this.postalCode = user.postal_code.toString();
    });

  }

  onSubmit() {
    const user = this.authService.getUser()!;
    if (this.password != this.confirmPassword) {
      alert('Les mots de passes doivent être identiques pour les modifier');
      return;
    }
    else if (this.password != '') {
      this.authService.updatePassword(this.password);
    }

    user.email = this.email;
    user.firstname = this.firstname;
    user.lastname = this.lastname;
    user.phone = this.phone;
    user.address = this.address;
    user.country = this.country;
    user.city = this.city;
    user.postal_code = parseInt(this.postalCode);

    this.userService.updateUserProfil(user);
    alert('Vos informations ont été sauvegardées');
  }
}
