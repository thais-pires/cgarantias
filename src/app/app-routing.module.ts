import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemComponent } from './produto/listagem/listagem.component';
import { CadastroComponent } from './produto/cadastro/cadastro.component';

const routes: Routes = [
  {
    path: "listagem-produtos",
    component: ListagemComponent
  },
  {
    path: "cadastro-produto",
    component: CadastroComponent
  },
  {
    path: "edicao-produto/:id",
    component: CadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
