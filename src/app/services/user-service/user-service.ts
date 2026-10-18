import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  getMokkedUserDetails(): UserModel {
    return {
      id: 1,
      firstName: 'Alessio',
      lastName: 'Zarbo',
    };
  }
}
