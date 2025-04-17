import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getClothingProducts(): Observable<Product[]> {
    const clothingCategories = [
      'mens-shirts',
      'mens-shoes',
      'mens-watches',
      'womens-dresses',
      'womens-shoes',
      'womens-watches',
      'womens-bags',
      'womens-jewellery'
    ];

    const requests = clothingCategories.map(category =>
      this.http.get<{ products: Product[] }>(`${this.baseUrl}/category/${category}`)
    );

    return forkJoin(requests).pipe(
      map(responses => responses.flatMap(res => res.products))
    );
  }
}
