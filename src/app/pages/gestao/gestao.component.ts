import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { ApiServiceService } from "../../api-service.service";
import { Router } from "@angular/router";
import { registerTheme } from "echarts";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.component.html',
  styleUrl: './gestao.component.scss',
})

export class GestaoComponent {
  isBrowser: boolean | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private service: ApiServiceService,
    private router: Router
  ) { };

  funcionarios: any[] = [];
  nomesFuncionarios: any[] = [];

  pieChartOptions: any;
  lineChartOptions: any;
  barChartOptions: any;

  ngOnInit() {

    this.isBrowser = typeof window !== 'undefined';
    this.isBrowser = isPlatformBrowser(this.platformId);

    for (let x in this.funcionarios) {
      this.nomesFuncionarios.push(this.funcionarios[x].nomeCompleto)
    }

    this.carregaFuncionarios()

    if (this.isBrowser) {

      this.graficoPizza()

      this.graficoLinha()

      this.graficoBarra()

    }
  }

  carregaFuncionarios() {
    this.service.chamaFuncionarios().subscribe({
      next: (data) => this.funcionarios = data //Atualiza a lista de funcionários
    });
  }

  graficoPizza() {

    let funcionariosDesligados = 0
    let funcionariosAtivos = 0
    let funcionariosAfastados = 0
    let funcionariosFerias = 0

    let funcionariosStatus = []

    for (let x in this.funcionarios) {

      this.nomesFuncionarios.push(this.funcionarios[x].nomeCompleto)

      Number(this.funcionarios[x].status)

      if (this.funcionarios[x].status == 0) {
        this.funcionarios[x].status = 'Desligado'
        funcionariosDesligados += 1
      }

      if (this.funcionarios[x].status == 1) {
        this.funcionarios[x].status = 'Ativo'
        funcionariosAtivos += 1
      }

      if (this.funcionarios[x].status == 2) {
        this.funcionarios[x].status = 'Afastado'
        funcionariosAfastados += 1
      }

      if (this.funcionarios[x].status == 3) {
        this.funcionarios[x].status = 'Férias'
        funcionariosFerias += 1
      }
    }

    funcionariosStatus = [funcionariosAtivos, funcionariosDesligados, funcionariosAfastados, funcionariosFerias]

    let legendas = ['Ativos', 'Desligados', 'Afastados', 'Férias']

    const series = legendas.map((nome: any, index: number) => {
      return {
        name: nome,
        value: funcionariosStatus[index] || [] // acessa os dados correspondentes ou um array vazio se não houver dados
      };
    });

    this.pieChartOptions = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: "vertical",
        left: "left",
        width: 300
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
          data: series
        }
      ],
    };
  }

  graficoLinha() {

    let horasFuncionarios = [
      [8, 8, 8, 8, 8],
      [4, 5.5, 3, 8, 8],
      [7, 7, 7, 5, 8,],
      [5, 8, 9, 9, 3],
      [6, 8, 8, 7.5, 8],
      [3, 5, 8, 8, 8],
      [8, 8, 8, 7.5, 8],
      [5, 9, 3, 10, 8]
    ]

    const series = this.nomesFuncionarios.map((nome: any, index: number) => {
      return {
        name: nome,
        type: 'line', // ou outro tipo de gráfico desejado
        stack: 'Total',
        data: horasFuncionarios[index] || [] // acessa os dados correspondentes ou um array vazio se não houver dados
      };
    });

    this.lineChartOptions = {
      title: {
        text: 'Frequência'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        //type: "scroll",

        textStyle: {
          fontSize: 11.52
        },
        itemGap: 3.3,
        itemWidth: 11,
        itemHeight: 11,
        data: this.nomesFuncionarios,
        orient: "vertical",
        left: "0%",
        top: "78%",
        fontSize: "50%",
        fontWeight: "lighter",

      },
      grid: {
        top: "15%",
        left: '3%',
        right: '4%',
        bottom: '25%',
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
      series: series,
      width: "90%",
    };
  }

  graficoBarra() {

    let horas2011 = [15, 16, 5, 9, 25, 23, 30, 37]
    let horas2012 = [8, 9, 40, 40, 19, 14, 8, 10]

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
      legend: {
        orient: "vertical",
        right: "right",
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0]
      },
      yAxis: {
        type: 'category',
        data: this.nomesFuncionarios
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
      width: "95%",
      series: [
        {
          name: '2011',
          type: 'bar',
          data: horas2011
        },
        {
          name: '2012',
          type: 'bar',
          data: horas2012
        }
      ],
    };
  }
}