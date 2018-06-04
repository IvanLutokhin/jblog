import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenHttpInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const account = this.auth.getAccount();

    if (account) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${account.token}`
        }
      });
    }

    return next.handle(request);
  }

}
