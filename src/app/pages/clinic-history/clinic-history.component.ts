import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ClinicHistory } from 'src/app/models/clinic_history.model';
import { Specialist } from 'src/app/models/users/specialist.model';
import { ClinicHistoryService } from 'src/app/services/clinic_history.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clinic-history',
  templateUrl: './clinic-history.component.html',
  styleUrls: ['./clinic-history.component.scss'],
})
export class ClinicHistoryComponent implements OnInit, OnChanges {
  @Input() public showDownload: boolean;
  @Input() public showGetReview: boolean;
  @Input() public showFiltered: boolean;
  @Input() public listOfClinicHistory: ClinicHistory[];
  @Output() public eventReturnToHome: EventEmitter<boolean>;
  @Output() public eventSendReview: EventEmitter<string>;
  @Input() public showClinicHistory: boolean;
  protected listOfSpecialist: Specialist[];
  protected loading: boolean;
  private listOfClinicHistoryBakcUp: ClinicHistory[];
  constructor(
    protected readonly userService: UserService,
    private readonly clinicHistoryService: ClinicHistoryService
  ) {
    this.loading = true;
    this.eventReturnToHome = new EventEmitter();
    this.eventSendReview = new EventEmitter();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.listOfClinicHistory) {
      this.listOfSpecialist = this.listOfClinicHistory.reduce((acum, curr) => {
        if (
          !acum.some(
            (value) => value.email === curr.appoinment.specialist.email
          )
        ) {
          acum.push(curr.appoinment.specialist);
        }
        return acum;
      }, [] as Specialist[]);

      this.listOfClinicHistoryBakcUp = [...this.listOfClinicHistory];
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2300);
  }

  protected returnToHome() {
    this.showClinicHistory = !this.showClinicHistory;
    this.eventReturnToHome.emit(this.showClinicHistory);
  }

  protected downloadClinicHistory() {
    this.clinicHistoryService.createPdf(
      `${this.userService.userLogged?.lastName}-${this.userService.userLogged?.name}`,
      this.listOfClinicHistory
    );
  }
  protected sendReview(review?: string) {
    this.eventSendReview.emit(review);
  }
  protected filterClinicHistoryBySpeciality(speciality: string) {
    if (speciality === 'all') {
      this.listOfClinicHistory = [...this.listOfClinicHistoryBakcUp];
    } else {
      this.listOfClinicHistory = this.listOfClinicHistoryBakcUp.filter(
        (clinicHistory) =>
          clinicHistory.appoinment.specialist.speciality.description ===
          speciality
      );
    }
  }
}
