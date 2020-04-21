import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardStudent implements CanActivate {
    theUser:any;
    constructor(private router: Router, private authService: AuthService) { 
        this.theUser = authService.getUser().user.user_type;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.authService.isUserAuthenticated() && this.theUser === 3) {
            return true;
        }

        // si el usuario no esta autenticado lo envio a la pagina de Login
        return this.router.createUrlTree(['/login']);
    }

}
