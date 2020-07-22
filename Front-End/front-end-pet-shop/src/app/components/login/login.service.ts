import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Users } from '../shared/models/Users';

const URLDEFAULT = "http://localhost:3000/users";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  public validateUser(user: Users): Observable<boolean>{
    return this.http.post<boolean>(`${URLDEFAULT}/validate`, user);
  }
}
