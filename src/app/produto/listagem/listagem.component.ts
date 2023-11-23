import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/shared/model/produto';
import { ProdutoService } from 'src/app/shared/services/produto.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {
  datasource: MatTableDataSource<Produto>;
  colunasVisiveis = ['nome', 'dataCompra', 'duracaoGarantiaMeses', 'dataFimGarantia', 'acoes'];
  produtos: Array<Produto> = [];

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private produtoService: ProdutoService, private roteador: Router) {
    this.datasource = new MatTableDataSource<Produto>();
  }

  ngOnInit() {
    this.produtoService.listarProduto().subscribe(produtos => {
      this.datasource = new MatTableDataSource<Produto>(produtos);
    });

      //   // Paginação
      //   // Inicialize o paginador
      //   this.datasource.paginator = this.paginator;

      //   // Carregue a primeira página
      //   this.carregarPagina(0);
      // }


  }

  carregarPagina(page: number): void {
    this.produtoService.listarPaginado(page, 10).subscribe(produtos => {
      this.datasource.data = produtos;
      });
  }

  filtrar(evento: Event): void {
    const texto = (evento.target as HTMLInputElement).value;
    this.datasource.filter = texto;
  }

  editarProduto(produto: Produto): void {
    this.roteador.navigate(['/cadastro-produto', produto.id]);
    console.log('Editar produto:', produto);
  }

  removerProduto(produto: Produto): void {
    this.produtoService.removerProduto(produto).subscribe( produtoRemovido => {
      console.log('Aluno removido');
    const indxProdutoARemover = this.produtos.findIndex(p =>
      p.id === produto.id);

    if (indxProdutoARemover >= 0) {
      this.produtos.splice(indxProdutoARemover, 1);
    }
    // this.carregarPagina(this.paginator.pageIndex);
    }
  );
    console.log('Remover produto:', produto);
  }
}


