import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ClassService } from 'src/app/core/services/class.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/models/user';
import { StudentClass } from 'src/app/models/studentClass';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SignUp } from 'src/app/models/signUp';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-my-class',
  templateUrl: './student-my-class.component.html',
  styleUrls: ['./student-my-class.component.scss']
})
export class StudentMyClassComponent implements OnInit {
  theUser: User;
  classList: StudentClass[];


  // Paginación
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<StudentClass>;
  constructor(private authService: AuthService, private classService: ClassService, private changeDetectorRef: ChangeDetectorRef) {
    this.theUser = authService.getUser().user;
    this.recharge();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
  signOut(card) {
    const user_id = this.theUser.user_id;
    const class_id = card.class_id;

    const signUp = new SignUp();
    signUp.class_id = class_id;
    signUp.user_id = user_id;
    console.log(signUp);
    this.classService.deleteClassSignUp(card).subscribe(data =>{
      this.recharge();
      Swal.fire({
        title: 'Clases!',
        text: 'Te has borrado de una clase',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })
    })


  }

  private recharge() {
    this.classService.getClassSignUp(this.theUser.user_id).subscribe(data => {
      this.classList = data;
      this.dataSource = new MatTableDataSource<StudentClass>(this.classList);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      this.changeDetectorRef?.detectChanges();
    })
  }

}
