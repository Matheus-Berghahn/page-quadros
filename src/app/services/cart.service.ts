import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  addToCart(item: Product): void {
    const currentItems = this.cartItemsSubject.getValue();
    const existingProduct = currentItems.find((product) => product.id === item.id);

    if (existingProduct) {
      existingProduct.quantity = existingProduct.quantity ? existingProduct.quantity + 1 : 2;
    } else {
      item.quantity = 1;
      currentItems.push(item);
    }

    this.cartItemsSubject.next(currentItems);
  }

  getCartItems() {
    return this.cartItems$;
  }

  removeItem(itemId: string): void {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.cartItemsSubject.next(updatedItems);
  }

  updateItemQuantity(itemId: string, quantity: number): void {
    const currentItems = this.cartItemsSubject.getValue();
    const item = currentItems.find((item) => item.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.cartItemsSubject.next(currentItems);
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  getTotal(): number {
    const currentItems = this.cartItemsSubject.getValue();
    return currentItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  }
}
