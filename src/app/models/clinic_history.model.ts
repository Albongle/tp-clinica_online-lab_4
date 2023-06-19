import { Appoinment } from './appoinment.model';

export class ClinicHistory {
  id: string;
  appoinment: Appoinment;
  height: number;
  weight: number;
  temperature: number;
  pressure: number;
  data?: AdditionalData[];

  constructor(clinicHistory: {
    id: string;
    appoinment: Appoinment;
    height: number;
    weight: number;
    temperture: number;
    pressure: number;
    data?: AdditionalData[];
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
  key: any;
  value: any;
  constructor(additional: { key: any; value: any }) {
    this.key = additional.key;
    this.value = additional.value;
  }
}
