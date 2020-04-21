import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { UserIdentity } from '../../models/user-identity';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = '';
  password = '';
  error = false;
  usuario = new User();

  constructor(private loginService: LoginService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(user_name: string, password: string) {
    if (user_name && password) {
      this.usuario.user_name = user_name;
      this.usuario.password = password;
      this.loginService.login(this.usuario).subscribe(x => {
        if (x) {
          // logamos al usuario en la app
          console.log(x);
          this.authService.storeUser(x);
          if(x.user.user_type === 1){
            this.router.navigate(['/admin']);
          }else if(x.user.user_type === 2){
            this.router.navigate(['/home']);
          }else if(x.user.user_type === 3){
            this.router.navigate(['/home']);
          }
          // this.router.navigate(['/home']); // redirección luego de entrar
        } else {
          this.error = true;
        }
      });
    } else {
      this.error = true;
    }
  }

}
