import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart, { Colors, Legend } from 'chart.js/auto';

@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.component.html',
  styleUrl: './gestao.component.scss',

})

export class GestaoComponent implements OnInit {

  constructor() { }

  @ViewChild('meuGrafico', { static: true }) elemento: ElementRef | undefined;

  funcionariosAtivos = 3
  funcionariosDesligados = 1
  funcionarioFerias = 2



  ngOnInit() {
    this.grafico(this.elemento?.nativeElement,)
  }

  grafico(elemento: any) {

    const labels = ['Funcionários Ativos', 'Funcionários Desligados', 'Funcionarios de Férias'];

    new Chart(elemento, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: [this.funcionariosAtivos, this.funcionariosDesligados, this.funcionarioFerias],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(75, 192, 192)',
              'rgb(255, 99, 132)',
              'rgb(201, 203, 207)'
            ]
          },
        ],
      },
    });
  }
}