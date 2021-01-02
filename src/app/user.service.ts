import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from './User';
import { USERS } from './mock-users';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { map, pluck, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from './models/UserInfo';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = new BehaviorSubject<User>(null);
  redirectUrl = '';

  constructor(private httpClient: HttpClient) {}

  public userlogin(email, password) {
    return this.httpClient
      .post<any>('https://waf-app.herokuapp.com/api/v1/users/login', {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.handleAuth(
            response.data.user._id,
            response.data.user.email,
            response.data.user.name,
            response.data.user.role,
            response.token,
            response.expiresIn
          );
        })
      );
  }

  public userregistration(userInfo: UserInfo) {
    return this.httpClient
      .post<any>('https://waf-app.herokuapp.com/api/v1/users/signup', {
        ...userInfo,
      })
      .pipe(
        tap((Users) => {
          return Users;
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const user = new User(
      userData.id,
      userData.email,
      userData.name,
      userData.role,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (user.gettoken()) {
      this.user.next(user);
    }
  }

  private handleAuth(
    id: string,
    email: string,
    name: string,
    role: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(
      new Date().getTime() + new Date(expiresIn).getTime()
    );

    const user = new User(id, email, name, role, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logOut() {
    localStorage.removeItem('userData');
    this.user.next(null);
  }
}
