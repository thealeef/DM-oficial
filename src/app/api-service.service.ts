import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest'
    });
    return this.http.get<FuncionariosModel>(this.baseURL,
      { headers: headers }
    );

    //return this.http.get<FuncionariosModel>(this.baseURL)
  }

  CriaFuncionario(funcionario: Funcionario): Observable<Funcionario[]> {

    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest'
    });

    return this.http.post<Funcionario[]>(this.baseURL, funcionario,
      { headers: headers })
    //Teste Alef
  }
}