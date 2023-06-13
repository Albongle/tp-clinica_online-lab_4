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
  protected chosenSpecislist: Specialist;

  constructor(
    protected readonly userService: UserService,
    private readonly specialitiesService: SpecialitiesService,
    private readonly alertService: AlertService,
    private readonly appoinmentService: AppoinmentService,
    private readonly formBuilder: FormBuilder
  ) {
    this.setSpecialist();
    this.setSpecialities();
    if (this.userService.userLogged?.userRole === 'admin') {
      this.setPatients();
    }
    this.formAppoinment = this.formBuilder.group({
      speciality: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      specialist: ['', Validators.required],
    });
    this.formAppoinment.controls['specialist'].disable();
    this.formAppoinment.controls['date'].disable();
    this.formAppoinment.controls['time'].disable();
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

  protected async selectSpeciality(specialitie: string) {
    this.listOfspecialistsAvailable = this.listOfspecialist.filter(
      (specialist) =>
        specialist.speciality.description === specialitie &&
        specialist.verifiedByAdmin
    );
    const usersMapped = await Promise.all(
      this.listOfspecialistsAvailable.map(async (u) => {
        u.profilePhoto = (await this.userService.getProfilePhoto(u)) as string;
        return u;
      })
    );

    this.listOfspecialistsAvailable = usersMapped;
    this.formAppoinment.controls['specialist'].reset();
  }

  protected chooseSpecialist(specialist: Specialist) {
    this.chosenSpecislist = specialist;
    this.formAppoinment.controls['specialist'].setValue(
      `Apellido: ${this.chosenSpecislist.lastName} Nombre:${this.chosenSpecislist.name}`
    );
  }

  protected create() {}
}
