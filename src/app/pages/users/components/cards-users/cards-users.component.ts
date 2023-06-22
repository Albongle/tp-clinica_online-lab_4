import { Component, EventEmitter, Input, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Appoinment } from 'src/app/models/appoinment.model';
import { User, UserRole } from 'src/app/models/users/user.model';
import { AppoinmentService } from 'src/app/services/appoinment.service';

@Component({
  selector: 'app-cards-users',
  templateUrl: './cards-users.component.html',
  styleUrls: ['./cards-users.component.scss'],
})
export class CardsUsersComponent {
  @Input() public listOfUsers: User[];
  @Input() public roleOption: UserRole;
  @Output() public eventSendUser: EventEmitter<User>;
  @Output() public eventShowCards: EventEmitter<boolean>;
  @Input() public showCards: boolean;
  protected date: string;

  constructor(private readonly appoinmentService: AppoinmentService) {
    const date = new Date();
    this.date = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    this.eventSendUser = new EventEmitter();
    this.eventShowCards = new EventEmitter();
    this.showCards = true;
  }

  protected return() {
    this.showCards = !this.showCards;
    this.eventShowCards.emit(this.showCards);
  }

  protected async exportUserToXls(user: User) {
    const appoinments = (
      (await firstValueFrom(
        this.appoinmentService.getAllAppoinment()
      )) as Appoinment[]
    ).filter((appoiment) => appoiment.patient.email === user.email);
    this.appoinmentService.exportAppoinmentsToXls(
      appoinments,
      `${user.email} - ${this.date}`
    );
  }
}
