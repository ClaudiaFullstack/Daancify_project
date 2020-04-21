import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { ChartService } from 'src/app/core/services/chart.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css'],
})
export class GraficosComponent implements OnInit {

  text: number;

  // gráfico 1 USUARIOS
  public doughnutChartLabels1: Label[] = [
    'Usuarios Activos',
    'Usuarios borrados',
    'Usuarios totales',
  ];
  public doughnutChartData1: MultiDataSet = [
    [this.text, 8, 335],
    // [100, 0, 500], // Expectativas de la empresa
  ];
  public doughnutChartType1: ChartType = 'doughnut';

  constructor(private _chart: ChartService) {
    this._chart.getCreatedUsers().subscribe((data) => {
      this.text = 8;
      console.log(this.text);
    });
  }
  ngOnInit() {}
}
