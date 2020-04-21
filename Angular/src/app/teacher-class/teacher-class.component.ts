import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-teacher-class',
  templateUrl: './teacher-class.component.html',
  styleUrls: ['./teacher-class.component.scss'],
})
export class TeacherClassComponent implements OnInit {
  theTeacherList: User[];
  // userId: number;
  id: any;

  constructor(
    private userModel: UserService,
    private router: Router,
    private routes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routes.params.subscribe((param) => {
      this.id = param.id;

      this.userModel.getTeacherId(this.id).subscribe((x) => {
        console.log(x);
      });
    });
  }
}
