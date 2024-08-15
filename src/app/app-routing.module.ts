import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { GestaoComponent } from './pages/gestao/gestao.component';
import { SobreComponent } from './pages/sobre/sobre.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'gestao', component: GestaoComponent },
  { path: 'sobre', component: SobreComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
