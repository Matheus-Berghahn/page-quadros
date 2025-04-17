import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FreteService {
  constructor(private http: HttpClient) {}

  calcularFrete(cepOrigem: string, cepDestino: string, peso: number) {
    const params = {
      nCdEmpresa: '',
      sDsSenha: '',
      nCdServico: '04510',
      sCepOrigem: cepOrigem,
      sCepDestino: cepDestino,
      nVlPeso: peso.toString(),
      nCdFormato: '1',
      nVlComprimento: '20',
      nVlAltura: '10',
      nVlLargura: '15',
      nVlDiametro: '0',
      sCdMaoPropria: 'N',
      nVlValorDeclarado: '0',
      sCdAvisoRecebimento: 'N',
      StrRetorno: 'xml'
    };

    return this.http.get('https://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo', { params, responseType: 'text' })
      .pipe(
        map(response => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(response, 'application/xml');
          const valor = xml.getElementsByTagName('Valor')[0].textContent;
          const prazo = xml.getElementsByTagName('PrazoEntrega')[0].textContent;
          return { valor, prazo };
        })
      );
  }
}
