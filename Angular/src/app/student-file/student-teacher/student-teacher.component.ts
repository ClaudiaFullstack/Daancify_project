import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { RouterModule, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-teacher',
  templateUrl: './student-teacher.component.html',
  styleUrls: ['./student-teacher.component.scss']
})
export class StudentTeacherComponent implements OnInit {
  teacherList: User[];
   // Paginación
   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   obs: Observable<any>;
   dataSource: MatTableDataSource<User>;
  constructor(private userService: UserService, private router: Router, private changeDetectorRef: ChangeDetectorRef) {
    this.userService.getTeachers().subscribe(data => {
      this.teacherList = data;
      console.log(data);
      this.dataSource = new MatTableDataSource<User>(this.teacherList);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      this.changeDetectorRef?.detectChanges();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

}
