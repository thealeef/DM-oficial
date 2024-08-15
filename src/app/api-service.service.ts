import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcionario, FuncionariosModel, } from './models/funcionarios.model';
import { FormGroup } from '@angular/forms';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseURL: string = "https://api-flask-python.vercel.app/funcionarios";

  constructor(private http: HttpClient) { }

  public novoProdutoForm: FormGroup | undefined;


  ChamaFuncionarios() {
    return this.http.get<FuncionariosModel>(this.baseURL)
  }

  CriaFuncionario(funcionario: Funcionario): Observable<Funcionario[]> {
    return this.http.post<Funcionario[]>(this.baseURL, funcionario);
  }
}