import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AdditionalData,
  ClinicHistory,
} from 'src/app/models/clinic_history.model';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-create-clinic-history',
  templateUrl: './create-clinic-history.component.html',
  styleUrls: ['./create-clinic-history.component.scss'],
})
export class CreateClinicHistoryComponent {
  @Output() public eventSendClinicHistory: EventEmitter<ClinicHistory>;
  protected formClinicHistory: FormGroup;
  protected aditionalField: number[];
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly alertService: AlertService
  ) {
    this.aditionalField = [];
    this.eventSendClinicHistory = new EventEmitter();
    this.formClinicHistory = this.formBuilder.group({
      height: ['', Validators.required],
      weight: ['', Validators.required],
      temperture: ['', Validators.required],
      pressure: ['', Validators.required],
    });
  }
  protected async sendClinicHistory() {
    if (this.formClinicHistory.valid) {
      const clinicHistory = new ClinicHistory({
        ...this.formClinicHistory.value,
      });
      if (this.aditionalField.length > 0) {
        const additionalData: AdditionalData[] = [];
        this.aditionalField.forEach((field) => {
          const data: AdditionalData = new AdditionalData({
            key: this.formClinicHistory.controls[`key_${field}`].value,
            value: this.formClinicHistory.controls[`value_${field}`].value,
          });

          additionalData.push(data);
        });

        clinicHistory.data = additionalData;
      }

      this.eventSendClinicHistory.emit(clinicHistory);
      this.formClinicHistory.reset();
    } else {
      await this.alertService.showAlert({
        icon: 'error',
        message: 'Debe completar todos los campos',
        timer: 2000,
      });
    }
  }

  protected addField($event: Event) {
    $event.preventDefault();

    if (this.aditionalField.length < 3) {
      const index = this.aditionalField.length + 1;
      this.aditionalField.push(index);
      this.formClinicHistory.addControl(
        `key_${index}`,
        new FormControl('', [Validators.required])
      );
      this.formClinicHistory.addControl(
        `value_${index}`,
        new FormControl('', [Validators.required])
      );
    }
  }
  protected removeField($event: Event) {
    $event.preventDefault();

    if (this.aditionalField.length > 0) {
      const valueToFind = this.aditionalField.length;
      const index = this.aditionalField.findIndex(
        (value) => value === valueToFind
      );
      if (index > -1) {
        this.aditionalField.splice(index, 1);
        this.formClinicHistory.removeControl(`key_${valueToFind}`);
        this.formClinicHistory.removeControl(`value_${valueToFind}`);
      }
    }
  }
}
