import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { Appoinment } from 'src/app/models/appoinment.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-count-appoinments',
  templateUrl: './count-appoinments.component.html',
  styleUrls: ['./count-appoinments.component.scss'],
})
export class CountAppoinmentsComponent {
  private listOfAppoinments: Appoinment[];
  protected appoinmentForSpecilaity: ChartData<
    'pie',
    number[],
    string | string[]
  >;
  protected appoinmentCountForSpecialist: ChartData<'bar'>;
  protected appoinmentForDay: ChartData<'line'>;
  protected appoinmentForLapseTime: ChartData<'line'>;
  protected appoinmentCompleteForLapseTime: ChartData<'line'>;

  constructor(private readonly appoinmentService: AppoinmentService) {
    this.setListOfAppoinments().then(() => {
      this.appoinmentForSpecilaity = this.mappedAppoinmentForSpeciality();
      this.appoinmentForDay = this.mappedAppoinmentForDay();
      this.appoinmentForLapseTime =
        this.mappedAppoinmentForSpecialistLapseTime();
      this.appoinmentCompleteForLapseTime =
        this.mappedAppoinmentCompleteForSpecialistLapseTime();
      this.appoinmentCountForSpecialist =
        this.setAppoinmentCountForSpecialist();
    });
  }

  private async setListOfAppoinments() {
    this.listOfAppoinments = (await firstValueFrom(
      this.appoinmentService.getAllAppoinment()
    )) as Appoinment[];
  }

  private mappedAppoinmentForSpeciality() {
    const datasets: { data: any[] } = { data: [] };
    const labels: string[] = [];

    this.listOfAppoinments.forEach((appoinment) => {
      if (
        !labels.some(
          (label) => label === appoinment.specialist.speciality.description
        )
      ) {
        labels.push(appoinment.specialist.speciality.description);
      }
    });

    labels.forEach((label) => {
      const countAppoinments = this.listOfAppoinments.filter(
        (appoinment) => appoinment.specialist.speciality.description === label
      );
      datasets.data.push(countAppoinments.length);
    });

    const chartData = { labels, datasets: [datasets] };
    return chartData;
  }

  private mappedAppoinmentForDay() {
    const datasets: { data: any[]; label: string } = {
      data: [],
      label: 'Cantida de turnos por dia',
    };
    const labels: string[] = [];

    this.listOfAppoinments.forEach((appoinment) => {
      if (!labels.some((label) => label === appoinment.day.date)) {
        labels.push(appoinment.day.date!);
      }
    });

    labels.forEach((label) => {
      const countAppoinments = this.listOfAppoinments.filter(
        (appoinment) => appoinment.day.date === label
      );
      datasets.data.push(countAppoinments.length);
    });

    const chartData = { labels, datasets: [datasets] };
    return chartData;
  }

  private mappedAppoinmentForSpecialistLapseTime() {
    let datasets: { data: any[]; label: string }[] = [];
    const labels: string[] = [];

    this.listOfAppoinments.forEach((appoinment) => {
      //genero los labels
      if (!labels.some((label) => label === appoinment.day.date)) {
        labels.push(appoinment.day.date!);
      }

      //genero los datasets
      if (
        !datasets.some((data) => data.label === appoinment.specialist.email)
      ) {
        datasets.push({ data: [], label: appoinment.specialist.email });
      }
    });

    labels.forEach((label) => {
      datasets.forEach((dataset) => {
        const appoinmentOfSpecialist = this.listOfAppoinments.filter(
          (appoinment) =>
            appoinment.day.date === label &&
            appoinment.specialist.email === dataset.label &&
            appoinment.state === 'complete'
        );
        dataset.data.push(appoinmentOfSpecialist.length);
      });
    });

    const chartData = { labels, datasets };
    return chartData;
  }

  private mappedAppoinmentCompleteForSpecialistLapseTime() {
    let datasets: { data: any[]; label: string }[] = [];
    const labels: string[] = [];

    this.listOfAppoinments.forEach((appoinment) => {
      //genero los labels
      if (!labels.some((label) => label === appoinment.day.date)) {
        labels.push(appoinment.day.date!);
      }

      //genero los datasets
      if (
        !datasets.some((data) => data.label === appoinment.specialist.email)
      ) {
        datasets.push({ data: [], label: appoinment.specialist.email });
      }
    });

    labels.forEach((label) => {
      datasets.forEach((dataset) => {
        const appoinmentOfSpecialist = this.listOfAppoinments.filter(
          (appoinment) =>
            appoinment.day.date === label &&
            appoinment.specialist.email === dataset.label
        );
        dataset.data.push(appoinmentOfSpecialist.length);
      });
    });

    const chartData = { labels, datasets };
    return chartData;
  }

  private setAppoinmentCountForSpecialist() {
    const datasets: { data: any[]; label: string } = {
      data: [],
      label: 'Cantida de turnos por especialista',
    };
    const labels: string[] = [];

    this.listOfAppoinments.forEach((appoinment) => {
      if (!labels.some((label) => label === appoinment.specialist.email)) {
        labels.push(appoinment.specialist.email);
      }
    });

    labels.forEach((label) => {
      const countAppoinments = this.listOfAppoinments.filter(
        (appoinment) => appoinment.specialist.email === label
      );
      datasets.data.push(countAppoinments.length);
    });

    const chartData = { labels, datasets: [datasets] };
    return chartData;
  }
}
