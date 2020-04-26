import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailModalComponent } from './user-detail-modal/user-detail-modal.component';
import { UserCreateModalComponent } from './user-create-modal/user-create-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [],
  styleUrls: ['./user-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  theUserList: User[] = [];

  constructor(
    private userModel: UserService,
    private router: Router,
    private routes: ActivatedRoute,
    public dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.recharge();
  }

  goToDetail(user: User) {
    const dialogRef = this.dialog.open(UserDetailModalComponent, {
      width: '850px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  search(user: User) {
    this.userModel.search(user).subscribe((x) => {
      this.theUserList = x;
    });
  }

  newUser() {
    const dialogRef = this.dialog.open(UserCreateModalComponent, {
      width: '850px',
      data: new User(),
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  clear() {
    this.recharge();
  }

  private recharge() {
    this.userModel.getUsers().subscribe((x) => {
      this.theUserList = x;

    });
  }
}
