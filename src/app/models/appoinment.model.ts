import { Day } from './schedule.model';
import { Patient } from './users/patient.model';
import { Specialist } from './users/specialist.model';
export class Appoinment {
  public day: Day;
  public patient: Patient;
  public specialist: Specialist;
  public state: 'pending' | 'complete' | 'cancel' | 'accepted' | undefined;
  public review: string | undefined;
  public survey: string | undefined;

  constructor(appoinment?: {
    day: Day;
    patient: Patient;
    specialist: Specialist;
    state: 'pending' | 'complete' | 'cancel' | 'accepted' | undefined;
    review?: string | undefined;
    survey?: string | undefined;
  }) {
    this.day = appoinment!.day;
    this.patient = appoinment!.patient;
    this.specialist = appoinment!.specialist;
    this.review = appoinment!.review;
    this.survey = appoinment!.survey;
  }
}