import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {
  valorItens: number = 100;
  valorFrete: number = 20;
  valorTotal: number = 0;

  endereco = {
    rua: '',
    numero: '',
    cidade: '',
    celular: ''
  };

  ngOnInit(): void {
    this.valorTotal = this.valorItens + this.valorFrete;
  }

  finalizarPagamento() {
    alert('Pedido finalizado! QR Code gerado (simulado).');
    // Aqui você poderia redirecionar ou salvar o pedido
  }
}
