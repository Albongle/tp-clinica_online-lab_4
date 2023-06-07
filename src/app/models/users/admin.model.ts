import { UploadResult } from 'firebase/storage';
import { User, UserRole } from './user.model';

export class Admin extends User {
  constructor(params: {
    name: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    profilePhoto: UploadResult;
  }) {
    super(params, UserRole.ADMIN);
  }
}
