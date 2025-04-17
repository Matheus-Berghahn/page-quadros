import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { FinalizadoComponent } from './pages/finalizado/finalizado.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'finalizado', component: FinalizadoComponent },
  { path: 'pagamento', component: PagamentoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
