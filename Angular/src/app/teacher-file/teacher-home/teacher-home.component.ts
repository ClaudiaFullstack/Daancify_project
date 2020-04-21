import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Class } from 'src/app/models/class';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ClassService } from 'src/app/core/services/class.service';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent implements OnInit {

  theUser: User;
  classList: Class;
  constructor(private router: Router, private authService: AuthService,private classService :ClassService) { 
    this.theUser = this.authService.getUser().user;

    this.classService.getAllClaseTime(this.theUser.user_id).subscribe(data =>{
      console.log(data);
      this.classList = data;
    })
  }

  ngOnInit(): void {
  }

}
