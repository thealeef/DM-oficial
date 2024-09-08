import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, PLATFORM_ID } from "@angular/core";
import * as echarts from 'echarts';

@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.component.html',
  styleUrl: './gestao.component.scss',

})

export class GestaoComponent {
  isBrowser: boolean | undefined;
  values: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  pieChartOptions: any;
  lineChartOption: any;

  funcionariosAtivos: any = 12
  funcionariosDesligados: any = 3
  funcionariosFerias: any = 3
  funcionariosAfastados: any = 2

  legenda = ['Ativos', 'Desligados', 'Férias', 'Afastados']

  ngOnInit() {

    this.values = []

    this.values.push(this.funcionariosAtivos)
    this.values.push(this.funcionariosDesligados)
    this.values.push(this.funcionariosFerias)
    this.values.push(this.funcionariosAfastados)

    this.isBrowser = typeof window !== 'undefined';
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {

      this.pieChartOptions = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.values[0], name: this.legenda[0] },
              { value: this.values[1], name: this.legenda[1] },
              { value: this.values[3], name: this.legenda[3] },
              { value: this.values[4], name: this.legenda[4] },
            ]
          }
        ]
      };

      this.lineChartOption = {
        title: {
          text: 'Frequência'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Alef Rib', 'Teste 01', 'Teste 02', 'Teste 03', 'Teste 04']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Sem', 'Ter', 'Qua', 'Qui', 'Sex']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Alef Rib',
            type: 'line',
            stack: 'Total',
            data: [8, 8, 8, 8, 8]
          },
          {
            name: 'Teste 01',
            type: 'line',
            stack: 'Total',
            data: [4, 5.5, 3, 8, 8]
          },
          {
            name: 'Teste 02',
            type: 'line',
            stack: 'Total',
            data: [7, 7, 7, 5, 8,]
          },
          {
            name: 'Teste 03',
            type: 'line',
            stack: 'Total',
            data: [5, 8, 9, 9, 3]
          },
          {
            name: 'Teste 04',
            type: 'line',
            stack: 'Total',
            data: [6, 8, 8, 7.5, 8]
          }
        ]
      };
    }
  }
}






