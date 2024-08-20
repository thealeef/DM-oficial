import { Component, OnInit, Output } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from 'events';
import { Funcionario, FuncionariosModel } from '../../models/funcionarios.model';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.scss'
})

export class FuncionariosComponent implements OnInit {

  @Output() enviar = new EventEmitter<FuncionariosModel>();

  funcionarioForm!: FormGroup

  funcionarios: FuncionariosModel | undefined;
  listaFuncionarios: any;

  recebeFuncionario: Funcionario | undefined;

  criarCadastroBoleana = false;
  editarCadastroBoleana = false;
  deletaCadastroBoleana = false;
  respDeletaCadastroBoleana = false;

  constructor(private service: ApiServiceService) { };

  ngOnInit(): void {
    this.service.ChamaFuncionarios().subscribe(funcionarios => {
      this.listaFuncionarios = funcionarios
    });

    console.log(this.listaFuncionarios)

    //Montando o Form//
    this.funcionarioForm = new FormGroup({
      id: new FormControl(),
      nomeCompleto: new FormControl(),
      nomeMae: new FormControl()
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

  abrirEditar() {
    if (this.editarCadastroBoleana == false) {
      this.editarCadastroBoleana = true
      this.criarCadastroBoleana = false
      this.deletaCadastroBoleana = false;
    } else {
      this.editarCadastroBoleana = false
    }
  }

  abrirDeletar() {
    this.respDeletaCadastroBoleana = confirm("Deseja deletar?")

    if (this.respDeletaCadastroBoleana) {
      this.deletaCadastroBoleana = true;
      this.criarCadastroBoleana = false
      this.editarCadastroBoleana = false

      alert('Deletado com Sucesso!')
    } else {
      this.deletaCadastroBoleana = false;
    }
  }

  cadastraFuncionario() {
    let vlr = 0
    let dados = this.funcionarioForm.value

    for (let x in dados) {
      if (dados[x] != undefined && dados[x] != '' && dados[x] != ' ') {
        //console.log(String(dados[x]).trim())
        vlr += 1
      }
    }

    if (vlr == Object.keys(dados).length) {

      this.enviar.emit(this.funcionarioForm.value)
      this.cardFuncionario(this.funcionarioForm.value)
    } else {
      alert('Por favor, preencha todos os campos!')
    }

  }

  cardFuncionario(funcionario: any) {

    //Adicionando o card na tela
    this.listaFuncionarios.push(funcionario)

    this.service.CriaFuncionario(funcionario).subscribe(func => this.recebeFuncionario = funcionario)

  }
}