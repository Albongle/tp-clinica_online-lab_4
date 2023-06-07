import { User, UserRole } from './user.model';

export class Patient extends User {
  public socialWork: string;
  public profilePhotoTwo: string;
  constructor(params: {
    userId: string;
    name: string;
    lastName: string;
    age: number;
    email: string;
    verified: boolean;
    password: string;
    socialWork: string;
    profilePhoto: string;
    profilePhotoTwo: string;
  }) {
    super(params, UserRole.PATIENT);
    this.socialWork = params.socialWork;
    this.profilePhotoTwo = params.profilePhotoTwo;
  }
}
