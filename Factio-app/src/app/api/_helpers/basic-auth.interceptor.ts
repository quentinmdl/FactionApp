import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const currentUser = this.authenticationService.currentUserValue;

        let token = window.localStorage.getItem('UserToken');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'bearer ' + token.replace(/['"]+/g, '')
                }
            });
        }

        return next.handle(request);
    }
}
