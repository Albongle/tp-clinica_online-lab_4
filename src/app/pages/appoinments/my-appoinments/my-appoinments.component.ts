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
  constructor(protected readonly userService: UserService) {}

  protected handlerChooseAppoinment(appoinment: Appoinment) {
    console.log(appoinment);
  }

  protected cancelAppoinment() {
    console.log(this.reason);
  }
}
