import { Injectable } from '@angular/core';
import { Observable } from "rxjs/index";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Account } from "../models/account.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private BASE_URL: string = 'api/accounts';

  constructor(private http: HttpClient) { }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.BASE_URL, account, httpOptions);
  }

  getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.BASE_URL}/${id}`);
  }

}
