import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcionario, FuncionariosModel, } from './models/funcionarios.model';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseURL: string = "https://flask-api-sage.vercel.app/funcionarios";
  //baseURL: string = 'http://127.0.0.1:5000/funcionarios'

  constructor(private http: HttpClient) { }

  public novoProdutoForm: FormGroup | undefined;

  ChamaFuncionarios() {

    return this.http.get<FuncionariosModel>(this.baseURL);
  }

  CriaFuncionario(funcionario: Funcionario): Observable<Funcionario[]> {

    console.log(funcionario)
    return this.http.post<Funcionario[]>(this.baseURL, funcionario)
  }
}