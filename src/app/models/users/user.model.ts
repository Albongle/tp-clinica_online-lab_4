export enum UserRole {
  ADMIN = 'admin',
  ESPECILIST = 'user',
  PATIENT = 'patient',
}

export class User {
  public userRole: UserRole;
  public name: string;
  public lastName: string;
  public age: number;
  public email: string;
  public password: string;
  public profilePhoto: string;

  constructor(
    params: {
      name: string;
      lastName: string;
      age: number;
      email: string;
      password: string;
      profilePhoto: string;
    },
    userRole: UserRole
  ) {
    this.age = params.age;
    this.email = params.name;
    this.lastName = params.lastName;
    this.name = params.name;
    this.password = params.password;
    this.profilePhoto = params.profilePhoto;
    this.userRole = userRole;
  }
}
