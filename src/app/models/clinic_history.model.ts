import { Appoinment } from './appoinment.model';

export class ClinicHistory {
  id: string;
  appoinment: Appoinment;
  height: number;
  weight: number;
  temperature: number;
  pressure: number;
  data?: AdditionalData;

  constructor(clinicHistory: {
    id: string;
    appoinment: Appoinment;
    height: number;
    weight: number;
    temperture: number;
    pressure: number;
    data?: AdditionalData;
  }) {
    this.appoinment = clinicHistory.appoinment;
    this.data = clinicHistory.data;
    this.height = clinicHistory.height;
    this.id = clinicHistory.id;
    this.pressure = clinicHistory.pressure;
    this.temperature = clinicHistory.pressure;
    this.weight = clinicHistory.weight;
  }
}

export class AdditionalData {
  'additional_1'?: string;
  'additional_2'?: string;
  'additional_3'?: string;
  constructor(additional: {
    additional_1?: string;
    additional_2?: string;
    additional_3?: string;
  }) {
    this.additional_1 = additional.additional_1;
    this.additional_2 = additional.additional_2;
    this.additional_3 = additional.additional_3;
  }
}
