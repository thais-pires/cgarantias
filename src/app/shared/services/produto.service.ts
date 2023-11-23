import { Injectable } from '@angular/core';
import { Produto } from "../model/produto";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {
  produtoAPI = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  cadastrarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.produtoAPI, produto);
  }

  listarProduto(): Observable<Produto[]> {
  return this.http.get<Produto[]>(this.produtoAPI);
}

  atualizarProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.produtoAPI}/${produto.id}`, produto);
  }

  removerProduto(produto: Produto): Observable<Produto> {
    return this.http.delete<Produto>(this.produtoAPI + '/' + produto.id);
  }

  pesquisarProdutoID(id: number): Observable<Produto> {
    return this.http.get<Produto>(this.produtoAPI + '/' + id);
  }

  pesquisarProdutoNome(nome: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.produtoAPI + '?nome=' + nome);
  }

  listarPaginado(page: number, pageSize: number, searchTerm?: string): Observable<Produto[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    return this.http.get<Produto[]>(this.produtoAPI, { params });
  }

}
