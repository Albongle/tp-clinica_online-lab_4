import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClinicHistory } from 'src/app/models/clinic_history.model';
import { ClinicHistoryService } from 'src/app/services/clinic_history.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clinic-history',
  templateUrl: './clinic-history.component.html',
  styleUrls: ['./clinic-history.component.scss'],
})
export class ClinicHistoryComponent implements OnInit {
  @Input() public showDownload: boolean;
  @Input() public showGetReview: boolean;
  @Input() public listOfClinicHistory: ClinicHistory[];
  @Output() public eventReturnToHome: EventEmitter<boolean>;
  @Output() public eventSendReview: EventEmitter<string>;
  @Input() public showClinicHistory: boolean;
  protected loading: boolean;
  constructor(
    protected readonly userService: UserService,
    private readonly clinicHistoryService: ClinicHistoryService
  ) {
    this.listOfClinicHistory ?? this.setListClinicalHistory();
    this.loading = true;
    this.eventReturnToHome = new EventEmitter();
    this.eventSendReview = new EventEmitter();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2300);
  }
  private async setListClinicalHistory() {
    if (this.userService.userLogged?.userRole === 'patient') {
      this.listOfClinicHistory = (
        await this.clinicHistoryService.getAllClinicHistory()
      ).filter(
        (clinicHistory) =>
          clinicHistory.appoinment.patient.email ===
          this.userService.userLogged?.email
      );
    } else if (this.userService.userLogged?.userRole === 'specialist') {
      this.listOfClinicHistory = (
        await this.clinicHistoryService.getAllClinicHistory()
      ).filter(
        (clinicHistory) =>
          clinicHistory.appoinment.specialist.email ===
          this.userService.userLogged?.email
      );
    } else {
      this.listOfClinicHistory =
        await this.clinicHistoryService.getAllClinicHistory();
    }
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
}
