import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.authService.isUserAuthenticated()) {
            return true;
        }

        // si el usuario no esta autenticado lo envio a la pagina de Login
        return this.router.createUrlTree(['/login']);
    }

}
