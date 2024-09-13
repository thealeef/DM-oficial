import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, PLATFORM_ID } from "@angular/core";
import * as echarts from 'echarts';
import { ApiServiceService } from "../../api-service.service";

@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.component.html',
  styleUrl: './gestao.component.scss',
})

export class GestaoComponent {
  isBrowser: boolean | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private service: ApiServiceService) { };

  funcionarios: any[] = [];

  pieChartOptions: any;
  lineChartOptions: any;
  barChartOptions: any;

  funcionariosAtivos: any = 0;
  funcionariosDesligados: any = 0;
  funcionariosFerias: any = 0;
  funcionariosAfastados: any = 0;

  funcionariosStatus: any = []

  nomesFuncionarios: any = []
  horas2011 = [15, 16, 5, 9, 25, 23, 30, 37]
  horas2012 = [8, 9, 40, 40, 19, 14, 8, 10]

  legendas = ['Ativos', 'Desligados', 'Afastados', 'Férias']

  horasFuncionarios = [
    [8, 8, 8, 8, 8],
    [4, 5.5, 3, 8, 8],
    [7, 7, 7, 5, 8,],
    [5, 8, 9, 9, 3],
    [6, 8, 8, 7.5, 8],
    [3, 5, 8, 8, 8],
    [8, 8, 8, 7.5, 8],
    [5, 9, 3, 10, 8]
  ]

  ngOnInit() {

    this.isBrowser = typeof window !== 'undefined';
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.carregaFuncionarios()

    const series = this.nomesFuncionarios.map((nome: any, index: number) => {
      return {
        name: nome,
        type: 'line', // ou outro tipo de gráfico desejado
        stack: 'Total',
        data: this.horasFuncionarios[index] || [] // acessa os dados correspondentes ou um array vazio se não houver dados
      };
    });

    this.funcionariosStatus = [this.funcionariosAtivos, this.funcionariosDesligados, this.funcionariosAfastados, this.funcionariosFerias]

    if (this.isBrowser) {

      this.pieChartOptions = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        color: [
          '#c23531',
          '#2f4554',
          '#61a0a8',
          '#d48265',
          '#91c7ae',
          '#749f83',
          '#ca8622',
          '#bda29a',
          '#6e7074',
          '#546570',
          '#c4ccd3'
        ],
        series: [
          {
            name: 'Status Funcionários',
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
              { value: this.funcionariosStatus[0], name: this.legendas[0] },
              { value: this.funcionariosStatus[1], name: this.legendas[1] },
              { value: this.funcionariosStatus[2], name: this.legendas[2] },
              { value: this.funcionariosStatus[3], name: this.legendas[3] },
            ]
          }
        ]
      };

      this.lineChartOptions = {
        title: {
          text: 'Frequência'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.nomesFuncionarios
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
          data: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
        },
        yAxis: {
          type: 'value'
        },
        color: [
          '#c23531',
          '#2f4554',
          '#61a0a8',
          '#d48265',
          '#91c7ae',
          '#749f83',
          '#ca8622',
          '#bda29a',
          '#6e7074',
          '#546570',
          '#c4ccd3'
        ],
        series: series
      };

      this.barChartOptions = {
        title: {
          text: 'Horas Trabalhadas'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.nomesFuncionarios //['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
        },
        color: [
          '#c23531',
          '#2f4554',
          '#61a0a8',
          '#d48265',
          '#91c7ae',
          '#749f83',
          '#ca8622',
          '#bda29a',
          '#6e7074',
          '#546570',
          '#c4ccd3'
        ],
        series: [
          {
            name: '2011',
            type: 'bar',
            data: this.horas2011
          },
          {
            name: '2012',
            type: 'bar',
            data: this.horas2012
          }
        ]
      };
    }
  }

  carregaFuncionarios() {
    this.service.chamaFuncionarios().subscribe({
      next: (data) => this.funcionarios = data //Atualiza a lista de funcionários
    });

    for (let x in this.funcionarios) {

      this.nomesFuncionarios.push(this.funcionarios[x].nomeCompleto)

      Number(this.funcionarios[x].status)

      if (this.funcionarios[x].status == 0) {
        this.funcionarios[x].status = 'Desligado'
        this.funcionariosDesligados += 1
      }

      if (this.funcionarios[x].status == 1) {
        this.funcionarios[x].status = 'Ativo'
        this.funcionariosAtivos += 1
      }

      if (this.funcionarios[x].status == 2) {
        this.funcionarios[x].status = 'Afastado'
        this.funcionariosAfastados += 1
      }

      if (this.funcionarios[x].status == 3) {
        this.funcionarios[x].status = 'Férias'
        this.funcionariosFerias += 1
      }

    }
  }
}






