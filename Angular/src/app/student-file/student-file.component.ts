import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../core/authentication/auth.service';

@Component({
  selector: 'app-student-file',
  templateUrl: './student-file.component.html',
  styleUrls: ['./student-file.component.scss']
})
export class StudentFileComponent implements OnInit {
  theUser: User
  constructor(private authService: AuthService) {
    this.theUser = authService.getUser().user;
  }

  ngOnInit(): void {
  }

}
