import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // const bearer = this.authService.getBearer();

        // if (bearer) {
        //     const authReq = req.clone({ headers: req.headers.set('Authorization', bearer) });
        //     return next.handle(authReq);
        // }

        return next.handle(req);

    }
}

// ESTO INSPECCIONA LAS PETICIONES Y LAS RESPUESTAS DESDE EL SERVER Y HACIA EL
