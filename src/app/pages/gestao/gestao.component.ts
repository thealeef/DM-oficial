import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.component.html',
  styleUrl: './gestao.component.scss',

})
export class GestaoComponent {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public someAction(): void {
    this.chart?.toBase64Image();
  }

  // Dados do gráfico
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  // Rótulos do eixo X
  public barChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // Tipo de gráfico
  public barChartType = 'pie';

  // Opções de personalização
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  // Cores do gráfico (opcional)
  public barChartColors = [
    {
      backgroundColor: 'rgba(255,255,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1
    },
    {
      backgroundColor: 'rgba(54,162,235,0.2)',
      borderColor: 'rgba(54,162,235,1)',
      borderWidth: 1
    }
  ];

  // Legenda
  public barChartLegend = true;

  ngOnInit() { }

}






