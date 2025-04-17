import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  displayedProducts: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = 'all';
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 12;

  genders = ['all', 'men', 'women'];
  categories = [
    'all',
    'shirts',
    'shoes',
    'watches',
    'dresses',
    'bags',
    'jewellery'
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getClothingProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.products = data;
        this.applyFilters();
      });
  }

  applyFilters(): void {
    this.currentPage = 1;

    this.filteredProducts = this.products.filter(product => {
      const title = product.title.toLowerCase();
      const category = product.category.toLowerCase();

      const categoryMatch =
        this.selectedCategory === 'all' ||
        category.includes(this.selectedCategory.toLowerCase());

      const searchMatch = title.includes(this.searchTerm.toLowerCase());

      return categoryMatch && searchMatch;
    });

    this.updateDisplayedProducts();
  }

  updateDisplayedProducts(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedProducts = this.filteredProducts.slice(start, end);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
