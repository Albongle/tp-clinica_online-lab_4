import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { Log } from 'src/app/models/log.model';
import { User } from 'src/app/models/users/user.model';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-days-logs',
  templateUrl: './days-logs.component.html',
  styleUrls: ['./days-logs.component.scss'],
})
export class DaysLogsComponent {
  private listOfLogs: Log[];
  protected listOfUsers: User[];

  protected logsForDay: ChartData<'bar'>;
  constructor(private readonly logService: LogsService) {
    this.setListLogs().then(() => {
      this.setListOfUsers();
    });
  }

  private async setListLogs() {
    this.listOfLogs = await this.logService.getAllLogs();
  }

  private mappedData(user: User) {
    const datasets: { data: any[]; label: string } = {
      data: [],
      label: `${user.email}`,
    };
    const labels: string[] = [];
    this.listOfLogs.forEach((log) => {
      if (user.email === log.user.email) {
        if (!labels.some((l) => l === log.date)) {
          labels.push(log.date);
        }
      }
    });

    labels.forEach((label) => {
      const logsDayUser = this.listOfLogs.filter(
        (log) => log.date === label && log.user.email === user.email
      );
      datasets.data.push(logsDayUser.length);
    });
    const chartData = { labels, datasets: [datasets] };
    return chartData;
  }

  private async setListOfUsers() {
    this.listOfUsers = this.listOfLogs.reduce((acum, curr) => {
      if (!acum.some((l) => l.email === curr.user.email)) {
        acum.push(curr.user);
      }
      return acum;
    }, [] as User[]);
  }

  protected filterByUser(user: User) {
    this.logsForDay = this.mappedData(user);
  }
}
