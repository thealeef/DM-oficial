import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcionario, FuncionariosModel, } from './models/funcionarios.model';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseURL: string = "https://flask-api-sage.vercel.app/funcionarios";
  //private baseURL: string = 'http://127.0.0.1:5000/funcionarios'

  constructor(private http: HttpClient) { }

  public novoProdutoForm: FormGroup | undefined;

  ChamaFuncionarios() {
    return this.http.get<FuncionariosModel>(this.baseURL);
  }

  AddFuncionario(funcionario: Funcionario): Observable<Funcionario[]> {
    return this.http.post<Funcionario[]>(this.baseURL, funcionario)
  }

  DelFuncionario(funcionario: any): Observable<any> {

    console.log(funcionario)
    return this.http.delete<any>(this.baseURL, funcionario)
  }
}