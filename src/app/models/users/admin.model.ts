import { User } from './user.model';

export class Admin extends User {
  constructor(params: {
    userId: string;
    name: string;
    lastName: string;
    age: number;
    email: string;
    dni: string;
    verified: boolean;
    password: string;
    profilePhoto: string;
  }) {
    super(params, 'admin');
  }
}
