import { Component } from '@angular/core';
import { ProductFilterComponent } from '../../components/shop/product-filter/product-filter.component';
import { Product } from '../../models/product.model';
import { DataPage, emptyPage } from '../../models/dataPage.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { BasketService } from '../../services/basket.service';
import { ProductComponent } from '../../components/shop/product/product.component';

@Component({
    standalone: true,
    selector: 'app-products',
    imports: [CommonModule, ProductFilterComponent, ProductComponent],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent {
    pageNumber: number = 1;
    products: DataPage<Product> = emptyPage;

    constructor(private authService: AuthService, private basketService: BasketService) { }

    onProductsChanged(productList: DataPage<Product>) {
        this.products = productList;
    }
    async addProductToCart(product: Product) {
        if (!this.authService.connected) {
            alert('Vous devez être connecté pour ajouter un produit au panier');
            return;
        }

        this.basketService.addToBasket(product);
    }
    getPageNumbers() {
        return new Array(this.products.pageCount).fill(0).map((_, i) => i + 1);
    }
    goToPage(pageNumber: number) {
        this.pageNumber = pageNumber;
    }
}
