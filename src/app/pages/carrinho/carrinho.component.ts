import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit, OnDestroy {
  cartItems: Product[] = [];
  cartTotal: number = 0;
  isConfirmingClear: boolean = false;
  isConfirmingRemoveItem: boolean = false;
  valorFrete: number = 0;
  prazoEntrega: number = 0;
  cepDestino: string = '';
  cepOrigem: string = '93410-172';

  private destroy$ = new Subject<void>();

  constructor(private cartService: CartService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getCartItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cartItems = items;
        this.calculateTotal();
      });
  }

  calculateTotal(): void {
    this.cartTotal = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // remover um item
  selectedItem: Product | null = null;
  
  removeFromCart(item: Product): void {
    this.selectedItem = item;
    this.isConfirmingRemoveItem = true;
  }
  
  confirmRemoveItem(): void {
    if (this.selectedItem) {
      this.cartService.removeItem(this.selectedItem.id);
      this.calculateTotal(); // opcional, se precisar atualizar algo
    }
    this.isConfirmingRemoveItem = false;
    this.selectedItem = null;
  }
  
  cancelRemoveItem(): void {
    this.isConfirmingRemoveItem = false;
    this.selectedItem = null;
  }
  // _________________________________


  updateQuantity(itemId: string, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateItemQuantity(itemId, quantity);
      this.calculateTotal();
    }
  }

  // limpar o carrinho
  clearCart(): void {
    this.isConfirmingClear = true;
  }

  confirmClearCart(): void {
    this.cartService.clearCart();
    this.isConfirmingClear = false;
    this.calculateTotal();
  }

  cancelClearCart(): void {
    this.isConfirmingClear = false;
  }

  calcularFrete(): void {
    if (this.cepDestino && this.cepDestino.length === 9) {
      const url = `https://api.linkcorreios.com.br/calculofrete/v1/calculo?cepOrigem=${this.cepOrigem}&cepDestino=${this.cepDestino}&valorCompra=${this.cartTotal}`;

      console.log('URL da API:', url);

      this.http.get<any>(url)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (response) => {
            console.log('Resposta da API:', response);
            if (response && response.valorFrete) {
              this.valorFrete = response.valorFrete;
              this.prazoEntrega = response.prazoEntrega;
            } else {
              console.error('Resposta inválida da API');
            }
          },
          (error) => {
            console.error('Erro ao calcular frete:', error);
          }
        );
    } else {
      console.error('CEP de destino inválido');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



  isCartEmptyAlertVisible: boolean = false;

  finalizarCompra() {
    if (this.cartItems.length === 0) {
      this.isCartEmptyAlertVisible = true; // Mostra o modal se o carrinho estiver vazio
    } else {
      this.router.navigate(['/pagamento']);
    }
  }
  
}
