import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SobreComponent } from './pages/sobre/sobre.component';
import { GestaoComponent } from './pages/gestao/gestao.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FuncionariosComponent,
    InicioComponent,
    SobreComponent,
    GestaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    HttpClientModule,
    HttpClient,
    provideHttpClient(withFetch()),
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
