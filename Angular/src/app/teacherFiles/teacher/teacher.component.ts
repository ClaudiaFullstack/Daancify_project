import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  theTeacherList: User[];

  constructor(private userModel: UserService, private router: Router, private routes: ActivatedRoute) { }

  ngOnInit(): void {

    this.userModel.getTeachers().subscribe(x => {
      console.log(x);
      this.theTeacherList = x;

  });
  }

}
