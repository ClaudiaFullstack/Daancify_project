import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'usuarios';
  isLogin = true;
  theUser = null;

  constructor(private authService: AuthService, private router: Router) {
    // escucho todos los eventos de router (es decir de navegacion)
    router.events.pipe(filter((event: any) => event instanceof NavigationStart)).subscribe(x => {
      this.isLogin = x.url === '/login';
      if (this.isLogin) {
        if (this.authService.isUserAuthenticated()) {
          router.navigate(['/home']);
        }
      }
      this.theUser = this.authService.getUser();
    });
  }

  ngOnInit() {
    // this.authService.User.subscribe(x => {
    //   if (x) {
    //     this.theUser = x;
    //   } else {
    //     this.router.navigate(['/login']);
    //   }
    // });
  }

  logoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
