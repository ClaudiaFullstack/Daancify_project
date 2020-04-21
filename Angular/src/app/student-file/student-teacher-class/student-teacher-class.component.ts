import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/core/services/class.service';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Class } from 'src/app/models/class';
import Swal from 'sweetalert2';
import { SignUp } from 'src/app/models/signUp';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-student-teacher-class',
  templateUrl: './student-teacher-class.component.html',
  styleUrls: ['./student-teacher-class.component.scss']
})
export class StudentTeacherClassComponent implements OnInit {
  id: number;
  theUser: User;
  classList: Class[];
  // Paginación
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Class>;
  constructor(private userModel: UserService, private router: Router, private routes: ActivatedRoute,
    private classService: ClassService, private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService) {
    this.theUser = authService.getUser().user;

    this.routes.params.subscribe((param) => {
      this.id = param.id;

      this.classService.getClassTeacher(this.id).subscribe((data) => {
        this.classList = data;
        this.dataSource = new MatTableDataSource<Class>(this.classList);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        this.changeDetectorRef.detectChanges();
      });
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
  signUp(card) {
    const user_id = this.theUser.user_id;
    const class_id = card.class_id;

    const signUp = new SignUp();
    signUp.class_id = class_id;
    signUp.user_id = user_id;

    this.classService.seeRegister(signUp).subscribe(data => {
      if (data.length) {

        Swal.fire({
          title: '!Ya estas registrado en esta clase¡',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        })


      } else {
        this.classService.ClassSignUp(signUp).subscribe(data => {
          console.log(data)
        })
        Swal.fire({
          title: '!Registrado en la clase¡',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        })
      }
    })
  }
}
