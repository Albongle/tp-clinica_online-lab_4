import { Patient } from './users/patient.model';
import { Specialist } from './users/specialist.model';
export class Appoinment {
  public id: string;
  public date: string;
  public time: string;
  public patient: Patient;
  public specialist: Specialist;
  public state: 'pending' | 'complete' | 'cancel' | 'accepted' | undefined;
  public review: string | undefined;
  public survey: string | undefined;

  constructor(appoinment: {
    id: string;
    date: string;
    time: string;
    patient: Patient;
    specialist: Specialist;
    state: 'pending' | 'complete' | 'cancel' | 'accepted' | undefined;
    review: string | undefined;
    survey: string | undefined;
  }) {
    this.date = appoinment.date;
    this.time = appoinment.time;
    this.id = appoinment.id;
    this.patient = appoinment.patient;
    this.specialist = appoinment.specialist;
    this.review = appoinment.review;
    this.survey = appoinment.survey;
  }
}
