import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Class } from 'src/app/models/class';
import { ClassService } from 'src/app/core/services/class.service';
import { ClassesDetailModalComponent } from './classes-detail-modal/classes-detail-modal.component';



@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styles: [],
  styleUrls: ['./classes-list.component.scss'],
})
export class ClassesListComponent implements OnInit {
  theClassList: Class[] = [];

  constructor(
    private classModel: ClassService,
    private router: Router,
    private routes: ActivatedRoute,
    public dialog: MatDialog,
    private classService: ClassService
  ) { }
  ngOnInit(): void {
    this.recharge();
  }

  goToDetail(user: User) {
    const dialogRef = this.dialog.open(ClassesDetailModalComponent, {
      width: '750px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  // search() {
  //   this.classModel.search(class).subscribe((x) => {
  //     this.theClassList = x;
  //   });
  // }

  newClass() {
    const dialogRef = this.dialog.open(ClassesDetailModalComponent, {
      width: '1050px',
      height: '500px',
      data: new Class(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
    });
  }
  search(newFilter) {
    this.classService.getAllAdminClassFilter(newFilter).subscribe(data => {
      this.theClassList = data;
    })
  }

  clear() {
    this.recharge();
  }

  private recharge() {
    this.classModel.getAllClass().subscribe((x) => {
      this.theClassList = x;
    });
  }

}

