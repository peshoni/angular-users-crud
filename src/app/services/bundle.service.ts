import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from 'src/generated/graphql';

@Injectable()
export class BundleService {
  user: BehaviorSubject<Users> = new BehaviorSubject(undefined);

  constructor() {}
  setUser(user: Users) {
    this.user.next(user);
  }
  getUser(): Users | undefined {
    return this.user.getValue();
  }
}
