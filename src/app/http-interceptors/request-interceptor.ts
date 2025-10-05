import { environment } from './../../environments/environment';
import { AppService } from 'src/app/utils/services/app.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  //backendUrl: string = 'http://localhost:4200/api/';
  //backendUrl: string = 'http://ata.sviluppo.host/v1/api/';
  backendUrl: string = environment.baseUrl;

  constructor(private appService: AppService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.appService.getToken();

    const httpReq = req.clone({
      url: this.backendUrl + req.url,
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(httpReq).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return;
            }
            this.router.navigate(['login']);
          }
        }
      )
    );
  }
}
