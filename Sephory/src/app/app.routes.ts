import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BasketComponent } from './pages/basket/basket.component';
import { ConnectComponent } from './pages/connect/connect.component';
import { DisconnectComponent } from './pages/disconnect/disconnect.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { RegisterComponent } from './pages/register/register.component';
import { PaymentComponent } from './pages/payment/payment.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'basket', component: BasketComponent },
    { path: 'connect', component: ConnectComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'disconnect', component: DisconnectComponent },
    { path: 'profil', component: ProfilComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'payment', component: PaymentComponent }
];
