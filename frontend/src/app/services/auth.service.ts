import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoginRequest } from "../models/login-request.model";
import { LoginResponse } from "../models/login-response.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL: string = 'api/auth';

  private accountId: number = 0;

  constructor(private http: HttpClient) { }

  getAccount(): any {
    return JSON.parse(localStorage.getItem('account'))
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('account') !== null;
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/login`, loginRequest, httpOptions).pipe(
      tap(
        (loginResponse: LoginResponse) => {
          localStorage.setItem('account', JSON.stringify({ accountId: loginResponse.accountId, token: loginResponse.token }));
        }
      )
    );
  }

  logout() {
    localStorage.removeItem('account');
  }

}
