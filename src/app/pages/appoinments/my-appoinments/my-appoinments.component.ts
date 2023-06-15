import { Component } from '@angular/core';
import { Appoinment } from 'src/app/models/appoinment.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-appoinments',
  templateUrl: './my-appoinments.component.html',
  styleUrls: ['./my-appoinments.component.scss'],
})
export class MyAppoinmentsComponent {
  protected reason: string;
  protected listCalification: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(protected readonly userService: UserService) {}

  protected handlerChooseAppoinment(appoinment: Appoinment) {
    console.log(appoinment);
  }

  protected cancelAppoinment() {
    console.log(this.reason);
  }
}
