import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.scss'
})

export class FuncionariosComponent implements OnInit {

  funcionarioForm!: FormGroup

  funcionarios: any[] = [];
  funcionario: any;

  cardsBoleana = false
  btnCriar = true
  criarCadastroBoleana = false;
  editarCadastroBoleana = false;

  respDeletaCadastroBoleana = false;

  constructor(private service: ApiServiceService, private router: Router) { };

  ngOnInit() {

    this.cardsBoleana = true

    this.carregaFuncionarios()

    //Montando o Form ao iniciar porque se não gera erro
    this.funcionarioForm = new FormGroup({
      nomeCompleto: new FormControl('', [Validators.required]),
      nomeMae: new FormControl('', [Validators.required])
    })
  }

  //Carrega lista de funcionários
  carregaFuncionarios() {
    this.service.chamaFuncionarios().subscribe({
      next: (data) => this.funcionarios = data //Atualiza a lista de funcionários
    });
  }

  //Adiciona funcionário 
  addFuncionario(funcionario: any) {
    this.service.addFuncionario(funcionario).subscribe({
      next: (response) => {
        this.funcionarios = response //Atualiza a lista de funcionários

        alert('Funcionario cadastrado com sucesso!') //Mensagem de sucesso

        this.criarCadastroBoleana = false
        this.funcionarioForm.reset();  // Reseta o formulário
      }
    });
  }

  //Edita funcionário pelo ID
  editaFuncionario(funcionario: any) {

    this.editarCadastroBoleana = true
    this.cardsBoleana = false
    this.criarCadastroBoleana = false
    this.btnCriar = false

    //Montando o Form com as infos do funcionário
    this.funcionarioForm = new FormGroup({
      id: new FormControl(funcionario["id"], [Validators.required]),
      nomeCompleto: new FormControl(funcionario["nomeCompleto"], [Validators.required]),
      nomeMae: new FormControl(funcionario["nomeMae"], [Validators.required])
    })
  }

  btnSalvar(funcionario: any) {

    this.service.editFuncionario(funcionario.id, funcionario).subscribe(
      response => this.carregaFuncionarios() //Atualiza a lista de funcionários
    );

    this.cardsBoleana = true
    this.editarCadastroBoleana = false

    this.funcionarioForm.reset();  // Reseta o formulário
  }

  //Deleta funcionario pelo ID
  delFuncionario(id: number) {
    this.service.delFuncionario(id).subscribe({
      next: (response) => {
        this.carregaFuncionarios();  // Atualiza a lista de usuários após deletar
      }
    });
  }
}