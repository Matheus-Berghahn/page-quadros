import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RouterModule } from '@angular/router';

// Importação dos módulos do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// Importação de formulários e outros módulos necessários
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Importação do serviço de mock API
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';

@NgModule({
  declarations: [
    AppComponent,   
    HomeComponent,
    HeaderComponent,
    BannerComponent,
    CarrinhoComponent,
    ProductListComponent,
    FooterComponent,
    LoginComponent,
    PagamentoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,           
    HttpClientModule,  
    MatCardModule,         
    MatButtonModule,       
    MatIconModule,         
    MatFormFieldModule,    
    MatInputModule,        
    MatToolbarModule,      
    MatSidenavModule, 
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonToggleModule,
    RouterModule.forRoot([ 
      { path: '', component: HomeComponent }, 
      { path: 'carrinho', component: CarrinhoComponent },
      { path: 'login', component: LoginComponent },
      { path: 'pagamento', component: PagamentoComponent },
    ]),
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
