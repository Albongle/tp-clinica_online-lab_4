import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { NgChartsModule } from 'ng2-charts';
import { DaysLogsComponent } from './components/days-logs/days-logs.component';
import { ButtonModule } from 'primeng/button';
import { CountAppoinmentsComponent } from './components/count-appoinments/count-appoinments.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PierChartComponent } from './components/pier-chart/pier-chart.component';

@NgModule({
  declarations: [
    ReportsComponent,
    DaysLogsComponent,
    CountAppoinmentsComponent,
    LineChartComponent,
    BarChartComponent,
    PierChartComponent,
  ],
  imports: [CommonModule, ReportsRoutingModule, NgChartsModule, ButtonModule],
})
export class ReportsModule {}
