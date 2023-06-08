import { User } from './user.model';

export class Patient extends User {
  public socialWork: string;
  public profilePhotoTwo: string;
  constructor(params: {
    userId: string;
    name: string;
    lastName: string;
    age: number;
    email: string;
    dni: string;
    verified: boolean;
    password: string;
    socialWork: string;
    profilePhoto: string;
    profilePhotoTwo: string;
  }) {
    super(params, 'patient');
    this.socialWork = params.socialWork;
    this.profilePhotoTwo = params.profilePhotoTwo;
  }
}
