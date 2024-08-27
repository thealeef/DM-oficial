import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.scss'
})

export class FuncionariosComponent implements OnInit {

  funcionarioForm!: FormGroup

  funcionarios: any[] = [];
  funcionario: any;

  criarCadastroBoleana = false;
  editarCadastroBoleana = false;
  deletaCadastroBoleana = false;
  respDeletaCadastroBoleana = false;

  constructor(private service: ApiServiceService) { };

  ngOnInit() {

    this.carregaFuncionarios()

    //Montando o Form
    this.funcionarioForm = new FormGroup({
      nomeCompleto: new FormControl('', [Validators.required]),
      nomeMae: new FormControl('', [Validators.required])
    })
  }

  abrirCadastro() {
    if (this.criarCadastroBoleana == false) {
      this.criarCadastroBoleana = true
      this.editarCadastroBoleana = false
      this.deletaCadastroBoleana = false

    } else {
      this.criarCadastroBoleana = false
    }
  }

  carregaFuncionarios() {
    this.service.chamaFuncionarios().subscribe({
      next: (data) => this.funcionarios = data,
      error: (error) => console.error('Erro ao carregar usuários', error)
    });
  }

  carregarFuncionario(id: number): void {
    this.service.chamaFuncionario(id).subscribe({
      next: (data) => this.funcionario = data,
      error: (error) => console.error('Erro ao carregar usuário', error)
    });
  }

  addFuncionario(funcionario: any) {
    this.service.addFuncionario(funcionario).subscribe({
      next: (response) => {
        console.log('Usuário adicionado', response);
        this.carregaFuncionarios();  // Atualiza a lista de usuários após adicionar
        alert('Funcionario cadastrado com sucesso!') //Mensagem de sucesso
        this.criarCadastroBoleana = false
        this.funcionarioForm.reset();  // Reseta o formulário
      },
      error: (error: any) => console.error('Erro ao adicionar usuário', error)
    });
  }

  delFuncionario(id: number) {
    this.service.delFuncionario(id).subscribe({
      next: (response) => {
        console.log('Usuário deletado', response);
        this.carregaFuncionarios();  // Atualiza a lista de usuários após deletar
      },
      error: (error) => console.error('Erro ao deletar usuário', error)
    });
  }
}