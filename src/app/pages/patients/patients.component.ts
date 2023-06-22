import { Component, OnInit } from '@angular/core';
import { ClinicHistory } from 'src/app/models/clinic_history.model';
import { Patient } from 'src/app/models/users/patient.model';
import { ClinicHistoryService } from 'src/app/services/clinic_history.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  protected listOfClinicHistory: ClinicHistory[];
  private listOfClinicHistoryBackUp: ClinicHistory[];
  protected loading: boolean;
  protected listOfPatients: Patient[];
  protected showClinicHistory: boolean;
  protected review?: string;
  constructor(
    private readonly clinicHistoryService: ClinicHistoryService,
    private readonly userService: UserService
  ) {
    this.loading = true;
    this.setListClinicalHistory().then(() => {
      this.setListOfPatients();
    });
  }

  private async setListClinicalHistory() {
    this.listOfClinicHistory = (
      await this.clinicHistoryService.getAllClinicHistory()
    ).filter(
      (clinicHistory) =>
        clinicHistory.appoinment.specialist.email ===
        this.userService.userLogged?.email
    );
    this.listOfClinicHistoryBackUp = [...this.listOfClinicHistory];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2300);
  }
  protected async setListOfPatients() {
    this.listOfPatients = [];
    this.listOfClinicHistory
      .map((clinicHistory) => clinicHistory.appoinment.patient)
      .forEach((patient) => {
        if (!this.listOfPatients.some((l) => l.email === patient.email)) {
          this.listOfPatients.push(patient);
        }
      });
  }

  protected filterClinicHistory(email: string) {
    if (email === 'all') {
      this.listOfClinicHistory = [...this.listOfClinicHistoryBackUp];
    } else {
      this.listOfClinicHistory = this.listOfClinicHistoryBackUp.filter(
        (clinicHistory) => clinicHistory.appoinment.patient.email === email
      );
    }
    this.showClinicHistory = true;
    this.review = undefined;
  }

  protected handlerShowReview(review: string) {
    this.review = review;
  }
}
