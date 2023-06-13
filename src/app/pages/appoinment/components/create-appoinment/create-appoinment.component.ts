import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/models/users/patient.model';
import { Specialist } from 'src/app/models/users/specialist.model';
import { AlertService } from 'src/app/services/alert.service';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-appoinment',
  templateUrl: './create-appoinment.component.html',
  styleUrls: ['./create-appoinment.component.scss'],
})
export class CreateAppoinmentComponent {
  protected listOfspecialities: string[];
  protected listOfspecialist: Specialist[];
  protected listOfpatients: Patient[];
  protected listOfspecialistsAvailable: Specialist[];
  protected formAppoinment: FormGroup;

  constructor(
    private readonly userService: UserService,
    private readonly specialitiesService: SpecialitiesService,
    private readonly alertService: AlertService,
    private readonly appoinmentService: AppoinmentService,
    private readonly formBuilder: FormBuilder
  ) {
    this.setSpecialist();
    this.setSpecialities();
    if (this.userService.userLogged?.userRole === 'admin') {
      this.setPatients();
      this.formAppoinment = this.formBuilder.group({
        speciality: ['', Validators.required],
        date: [''],
        time: [''],
        specialist: [null],
      });
    }
  }

  private async setSpecialist() {
    const users = await this.userService.getUsersFromStore();
    this.listOfspecialist = users.filter(
      (user) => user.userRole === 'specialist'
    ) as Specialist[];
  }

  private async setSpecialities() {
    const specialities = await this.specialitiesService.getAllSpecialities();
    this.listOfspecialities = specialities.map((s) => s.description);
  }

  private async setPatients() {
    const users = await this.userService.getUsersFromStore();
    this.listOfpatients = users.filter(
      (user) => user.userRole === 'patient'
    ) as Patient[];
  }

  protected selectSpeciality(specialitie: string) {}

  protected create() {}
}
