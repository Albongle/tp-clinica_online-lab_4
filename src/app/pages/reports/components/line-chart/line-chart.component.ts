import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { AlertService } from 'src/app/services/alert.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent {
  protected lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        min: 0,
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
    },
  };
  protected lineChartType: ChartType = 'line';
  @Input() public lineData: ChartData<'line'>;
  @Input() public title: string;
  @Input() public id: string;

  constructor(
    private readonly reportService: ReportService,
    private readonly alertService: AlertService
  ) {}

  protected async downloadChart() {
    if (this.lineData) {
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
