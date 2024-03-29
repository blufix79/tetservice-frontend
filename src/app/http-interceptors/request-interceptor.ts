import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  backendUrl: string = "http://localhost:4200/api/";
  //backendUrl: string = "api/";

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const httpReq = req.clone({
      url: this.backendUrl + req.url,
    });
    const size = new TextEncoder().encode(JSON.stringify(req.body)).length;
    const kiloBytes = size / 1024;
    const megaBytes = kiloBytes / 1024;
    return next.handle(httpReq);
  }
}
