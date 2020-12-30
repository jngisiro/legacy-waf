import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from './User';
import { USERS } from './mock-users';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUsers(): Observable<User[]> {
    return of(USERS);

    this.messageService.add('fetched some users for comparing');
  }

  redirectUrl: string;
  // baseUrl:string = "http://localhost:4200/api";
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient
  ) {}

  public userlogin(username, password) {
    alert(username);
    return this.httpClient
      .post<any>('api/login.php', { username, password })
      .pipe(
        map((Users) => {
          this.setToken(Users[0].name);
          this.getLoggedInName.emit(true);
          return Users;
        })
      );
  }

  public userregistration(name, pwd) {
    return this.httpClient
      .post<any>('api/register.php', { name, pwd })
      .pipe(
        map((Users) => {
          return Users;
        })
      );
  }

  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true;
    }
    return false;
  }
}
