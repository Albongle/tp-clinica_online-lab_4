import { Component, Input } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ReportService } from 'src/app/services/report.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-pier-chart',
  templateUrl: './pier-chart.component.html',
  styleUrls: ['./pier-chart.component.scss'],
})
export class PierChartComponent {
  protected pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };

  @Input() public pieData: ChartData<'pie', number[], string | string[]>;
  @Input() public title: string;
  @Input() public id: string;
  protected pieChartType: ChartType = 'pie';
  protected pieChartPlugins = [DatalabelsPlugin];

  constructor(
    private readonly reportService: ReportService,
    private readonly alertService: AlertService
  ) {}

  protected async downloadChart() {
    if (this.pieData) {
      const element = document.getElementById(`${this.id}`) as HTMLElement;
      this.reportService.createPdf(element, this.title);
    } else {
      await this.alertService.showAlert({
        icon: 'warning',
        message: 'Grafico Incompleto',
        timer: 2000,
      });
    }
  }
}
