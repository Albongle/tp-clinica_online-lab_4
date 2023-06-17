import { Day } from './schedule.model';
import { Survey } from './survey.model';
import { Patient } from './users/patient.model';
import { Specialist } from './users/specialist.model';
export type AppoinmentState =
  | 'pending'
  | 'complete'
  | 'cancel'
  | 'accepted'
  | undefined;

export type AppoinmentCalification = 1 | 2 | 3 | 4 | 5 | undefined;
export class Appoinment {
  public id: string;
  public day: Day;
  public patient: Patient;
  public specialist: Specialist;
  public state: AppoinmentState;
  public review: string | undefined;
  public survey: Survey | undefined;
  public calification: AppoinmentCalification;
  constructor(appoinment: {
    day: Day;
    patient: Patient;
    specialist: Specialist;
    state?: AppoinmentState;
    review?: string;
    survey?: Survey;
    calification?: AppoinmentCalification;
  }) {
    this.day = appoinment.day;
    this.patient = appoinment.patient;
    this.specialist = appoinment.specialist;
    this.state = appoinment.state;
    this.review = appoinment.review;
    this.survey = appoinment.survey;
    this.calification = appoinment.calification;
  }
}
