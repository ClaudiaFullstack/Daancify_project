import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ClassService } from 'src/app/core/services/class.service';
import { StudentClass } from 'src/app/models/studentClass';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SignUp } from 'src/app/models/signUp';
import Swal from 'sweetalert2';
import { DanceStyle } from 'src/app/models/danceStyle';
import { Class } from 'src/app/models/class';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.scss']
})
export class StudentClassComponent implements OnInit {
  theUser: User;
  classList: StudentClass[];
  Register: SignUp;
  alert = false;

  //Filter
  dance_styles: DanceStyle;
  filterForm: FormGroup;

  // Paginación
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<StudentClass>;

  constructor(private authService: AuthService, private classService: ClassService, private changeDetectorRef: ChangeDetectorRef,
    fb: FormBuilder) {
    this.theUser = authService.getUser().user;
    this.recharge();

    // Para recoger todos los estilos de bailes para el form de class y user (select)
    this.classService.getAllDanceStyle().subscribe((data) => {
      this.dance_styles = data;

    });

    this.filterForm = fb.group({
      location: [""],
      class_name: [''],
      price: [""],
      start_date: [""],
      level: [""],
      dance_style_id: [""],
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

  filter(filter) {
    console.log(filter);
    const newFilter = new StudentClass(filter);
    console.log(newFilter)
    this.classService.getAllClassFilter(newFilter).subscribe(data => {
      this.classList = data;
      this.dataSource = new MatTableDataSource<StudentClass>(this.classList);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      this.changeDetectorRef?.detectChanges();

    })
  }
  clear() {
    this.recharge();
  }

  private recharge() {
    this.classService.getAllClassByDate().subscribe(data => {
      this.classList = data;
      this.dataSource = new MatTableDataSource<StudentClass>(this.classList);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      this.changeDetectorRef?.detectChanges();
    })
  }
}
