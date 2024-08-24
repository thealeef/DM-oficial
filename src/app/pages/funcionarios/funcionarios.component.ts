import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Funcionario, FuncionariosModel } from '../../models/funcionarios.model';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.scss'
})

export class FuncionariosComponent implements OnInit {

  funcionarioForm!: FormGroup

  funcionarios: FuncionariosModel | undefined;
  listaFuncionarios: any;

  recebeFuncionario: Funcionario | undefined;

  criarCadastroBoleana = false;
  editarCadastroBoleana = false;
  deletaCadastroBoleana = false;
  respDeletaCadastroBoleana = false;

  selFuncionario: Funcionario | undefined;

  constructor(private service: ApiServiceService) { };

  ngOnInit() {

    this.atualiza()

    //Montando o Form
    this.funcionarioForm = new FormGroup({
      id: new FormControl('0', [Validators.required]),
      nomeCompleto: new FormControl('', [Validators.required]),
      nomeMae: new FormControl('', [Validators.required])
    })
  }

  abrirCadastro() {
    if (this.criarCadastroBoleana == false) {
      this.criarCadastroBoleana = true
      this.editarCadastroBoleana = false
      this.deletaCadastroBoleana = false

      //this.cadastraFuncionario()

    } else {
      this.criarCadastroBoleana = false
    }
  }

  atualiza() {
    this.service.ChamaFuncionarios().subscribe(dados => {
      this.listaFuncionarios = dados
    });
  };

  addFuncionario(funcionario: any) {
    //Chamada do service e passando os dados para Lista Funcionarios
    this.service.AddFuncionario(funcionario).subscribe((dados) => {
      console.log(dados)
      this.listaFuncionarios = dados
    });

    alert('Funcionário criado com Sucesso!')
    this.criarCadastroBoleana = false

    this.atualiza()

    //Reseta o FormGroup após salvar 
    this.funcionarioForm.reset()
  };

  editFuncionario() {
    console.log('Chamou! EDIT')
  };

  delFuncionario(funcionario: any) {

    console.log(funcionario)
    this.service.DelFuncionario(funcionario).subscribe(dados => {
      console.log(dados)
      //this.listaFuncionarios = dados
    });
  };
}