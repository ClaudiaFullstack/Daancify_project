import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailModalComponent } from './user-detail-modal/user-detail-modal.component';

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
  ) {
    console.log("dsada")
  }
  ngOnInit(): void {
    this.recharge();
  }

  goToDetail(user: User) {
    const dialogRef = this.dialog.open(UserDetailModalComponent, {
      width: '750px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });

    // this.router.navigate(['./', user.id], { relativeTo: this.routes });
    // this.router.navigate(['/users/', user.id]);
  }

  search(user: User) {
    this.userModel.search(user).subscribe((x) => {
      this.theUserList = x;
      console.log(x)
    });
  }

  newUser() {

    const dialogRef = this.dialog.open(UserDetailModalComponent, {
      width: '650px',
      data: new User(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  clear(){
    this.recharge();
  }

  private recharge(){
    this.userModel.getUsers().subscribe((x) => {
      this.theUserList = x;

    });
  }
}
