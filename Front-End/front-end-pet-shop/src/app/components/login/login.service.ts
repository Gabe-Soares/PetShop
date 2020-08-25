import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserAuth } from '../models/UserAuthModel';

const URLDEFAULT = "http://localhost:3000/users";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: UserAuth;
  isLogIn: boolean = false;
  constructor(private http: HttpClient) { }

  public validateUser(user){
    return this.http.post<UserAuth>(`${URLDEFAULT}/validate`, user);
  }
  public getIsLogIn(){
    return this.isLogIn;
  }
  public setIsLogIn(status: boolean){
    this.isLogIn = status;
  }
  public getUser(){
    return this.user;
  }
  public setUser(user){
    this.user = user;
  }
}
