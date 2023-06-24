import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { AlertService } from 'src/app/services/alert.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
  protected barChartType: ChartType = 'bar';
  protected barChartPlugins = [DataLabelsPlugin];
  @Input() public bartData: ChartData<'bar'>;
  @Input() public title: string;
  @Input() public id: string;
  protected barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'center',
      },
    },
  };
  constructor(
    private readonly reportService: ReportService,
    private readonly alertService: AlertService
  ) {}

  protected async downloadChart() {
    if (this.bartData) {
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
