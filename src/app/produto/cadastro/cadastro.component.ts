import { Component } from '@angular/core';
import { Produto } from 'src/app/shared/model/produto';
import { ProdutoService } from 'src/app/shared/services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {


  readonly NOME_BOTAO_CADASTRAR = 'Cadastrar';
  readonly NOME_BOTAO_ATUALIZAR = 'Atualizar';
  produtoTratamento: Produto;
  mensagemErro = '';
  estahCadastrando = true;
  nomeBotao = this.NOME_BOTAO_CADASTRAR;

  constructor(private produtoService: ProdutoService, private rotaAtivada: ActivatedRoute, private roteador: Router) {
    const idEdicao = this.rotaAtivada.snapshot.params['id'];
    if (idEdicao) {
      this.estahCadastrando = false;
      this.produtoService.pesquisarProdutoID(idEdicao).subscribe(produtoRetornado => {
        this.produtoTratamento = produtoRetornado;
      });
    }
    this.produtoTratamento = new Produto(0, '', new Date(), 0, '');
    this.nomeBotao = this.estahCadastrando ? this.NOME_BOTAO_CADASTRAR : this.NOME_BOTAO_ATUALIZAR;
  }

  cadastrarOuAtualizar(): void {
    if (this.estahCadastrando) {

      const dataCompra = new Date(this.produtoTratamento.dataCompra);
      const dataFimGarantia = new Date(dataCompra);
      dataFimGarantia.setMonth(dataCompra.getMonth() + this.produtoTratamento.duracaoGarantiaMeses);
      this.produtoTratamento.dataFimGarantia = dataFimGarantia.toISOString().slice(0, 10);

      this.produtoService.cadastrarProduto(this.produtoTratamento).subscribe(
        produtoCadastrado => {
          this.roteador.navigate(['/listagem-produtos']);
        }
      );

    } else {
      this.produtoService.atualizarProduto(this.produtoTratamento).subscribe(produto => {
        this.roteador.navigate(['/listagem-produtos']);
      });
    }
  }
}
