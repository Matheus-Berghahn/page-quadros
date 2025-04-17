import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product.model';
import { AuthService } from '../../services/auth-local.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount = 0;
  cartItems: Product[] = [];
  showCartPreview = false;
  isLoggedIn = false;
  userName: string | null = null;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.authService.userName$.subscribe((name) => {
      this.userName = name;
    });

    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.cartCount = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  }

  goToCart(): void {
    this.router.navigate(['/carrinho']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
