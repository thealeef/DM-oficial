import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl: string = "https://flask-api-sage.vercel.app/funcionarios";
  //private apiUrl: string = 'http://127.0.0.1:5000/funcionarios'

  constructor(private http: HttpClient) { }

  // Método GET para obter a lista de usuários
  chamaFuncionarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método GET para obter um funcionário específico por ID
  chamaFuncionario(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Método POST para adicionar um funcionário
  addFuncionario(funcionario: any): Observable<any> {
    console.log(funcionario)
    const url = `${this.apiUrl}`;
    return this.http.post<any>(url, funcionario);
  }

  // Método DELETE para deletar um usuário pelo ID
  delFuncionario(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}

