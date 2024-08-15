export interface FuncionariosModel {
    funcionarios: Funcionario[];
}

export interface Funcionario {
    id: number;
    nomeCompleto: string;
    nomeMae: string;
}