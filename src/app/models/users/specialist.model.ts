import { User } from './user.model';

export class Specialist extends User {
  public verifiedByAdmin: boolean;
  public speciality: string;
  constructor(params: {
    userId: string;
    name: string;
    lastName: string;
    age: number;
    dni: string;
    email: string;
    password: string;
    speciality: string;
    verified: boolean;
    verifiedByAdmin: boolean;
    profilePhoto: string;
  }) {
    super(params, 'specialist');
    this.verifiedByAdmin = params.verifiedByAdmin;
    this.speciality = params.speciality;
  }
}
