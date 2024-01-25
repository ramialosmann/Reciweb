import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/User';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  currentusersource = new BehaviorSubject<User | null>(null);
  currentuser$ = this.currentusersource.asObservable();

  constructor(private http : HttpClient)
  {

  }

  SetCurrentUser(user : User) {
    this.currentusersource.next(user);
  }
  
  Register(model : any) {
    return this.http.post<User>(this.baseUrl + 'account/register' , model).pipe(
      map(
        user => {
          if(user) {
            localStorage.setItem('user' , JSON.stringify(user));
            this.currentusersource.next(user);
          }
        }
      )
    )
  }

  Login(model : any) {
    return this.http.post<User>(this.baseUrl + 'account/login' , model).pipe(
      map(
        user => {
          if(user) {
            localStorage.setItem('user' , JSON.stringify(user));
            this.currentusersource.next(user);
          }
        }
      )
    )
  }

  Logout() {
    localStorage.removeItem('user');
    this.currentusersource.next(null);
  }
}
