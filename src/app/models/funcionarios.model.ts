export interface FuncionariosModel {
    funcionarios: Funcionario[];
}

export interface Funcionario {
    id: string;
    nomeCompleto: string;
    nomeMae: string;
}