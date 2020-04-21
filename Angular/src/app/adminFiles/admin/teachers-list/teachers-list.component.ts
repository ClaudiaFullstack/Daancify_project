import { Component, OnInit } from '@angular/core';
import { TeacherDetailModalComponent } from './teacher-detail-modal/teacher-detail-modal.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {

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
    const dialogRef = this.dialog.open(TeacherDetailModalComponent, {
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
    });
  }

  clear(){
    this.recharge();
  }

  newUser() {
    // this.router.navigate(['./new'], { relativeTo: this.routes })

    const dialogRef = this.dialog.open(TeacherDetailModalComponent, {
      width: '650px',
      data: new User(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
    });
  }

  private recharge(){
    this.userModel.getTeachers().subscribe((x) => {
      this.theUserList = x;
    });
  }
}
