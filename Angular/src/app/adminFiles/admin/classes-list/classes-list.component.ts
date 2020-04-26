import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Class } from 'src/app/models/class';
import { ClassService } from 'src/app/core/services/class.service';
import { ClassesDetailModalComponent } from './classes-detail-modal/classes-detail-modal.component';
import { ClassesCreateModalComponent } from './classes-create-modal/classes-create-modal.component';



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
      width: '1000px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }


  newClass() {
    const dialogRef = this.dialog.open(ClassesCreateModalComponent, {
      width: '1050px',
      height: '700px',
      data: new Class(),
    });

    dialogRef.afterClosed().subscribe((result) => {

    });
  }
  search(newFilter) {
    this.classService.getAllAdminClassFilter(newFilter).subscribe(data => {
      this.theClassList = data;
    });
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

