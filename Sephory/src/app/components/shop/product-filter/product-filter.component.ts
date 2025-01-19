import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { DataPage, emptyPage } from '../../../models/dataPage.model';
import { Product } from '../../../models/product.model';
import { ProductCategory, defaultCategory } from '../../../models/productCategory.model';
import { ProductsService } from '../../../services/products.service';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss',
  standalone: true
})
export class ProductFilterComponent {
  @Input() products: DataPage<Product> = emptyPage
  @Input() categories: ProductCategory[] = [];
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 0;
  @Input() searchName: string = '';
  @Input() pageNumber: number = 1;

  @Output() productsChanged: EventEmitter<DataPage<Product>> = new EventEmitter<DataPage<Product>>();


  constructor(private productService: ProductsService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageNumber']) {
      this.loadProducts();
    }
  }
  ngOnInit() {
    this.loadCategories();
    this.loadProducts().then(() => {
      this.maxPrice = this.products.maxPrice;
      this.minPrice = this.products.minPrice;
    })
  }
  async loadCategories() {
    this.categories = await this.productService.getCategories();
  }
  async loadProducts() {
    this.products = await this.productService.getProducts({
      pageNumber: this.pageNumber,
      searchName: this.searchName,
      minPrice: Math.floor(this.minPrice / 100),
      maxPrice: Math.floor(this.maxPrice / 100),
      categories: this.categories.filter(x => x.selected).map(x => x.id)
    });

    this.productsChanged.emit(this.products);
  }
  async resetPricesAndLoad() {
    this.minPrice = 0;
    this.maxPrice = 0;
    this.pageNumber = 1;

    await this.loadProducts();
    this.minPrice = this.products.minPrice;
    this.maxPrice = this.products.maxPrice;
  }
}
