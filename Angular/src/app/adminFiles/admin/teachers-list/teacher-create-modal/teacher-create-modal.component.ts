import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/user';
import { DanceStyle } from 'src/app/models/danceStyle';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDetailModalComponent } from '../../users-list/user-detail-modal/user-detail-modal.component';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassService } from 'src/app/core/services/class.service';
import Swal from 'sweetalert2';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-teacher-create-modal',
  templateUrl: './teacher-create-modal.component.html',
  styleUrls: ['./teacher-create-modal.component.scss']
})
export class TeacherCreateModalComponent implements OnInit {
  teacherId: string;
  user: User;
  dance_styles: DanceStyle;
  teacherForm: FormGroup;
  srcResult: any;
  matcher = new MyErrorStateMatcher(); // < -- todos los form

  // va con un codigo de arriba del @Component


  constructor(
    public dialogRef: MatDialogRef<TeacherCreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    fb: FormBuilder,
    private teacherModel: UserService,
    private snackBar: MatSnackBar,
    private classService: ClassService,
    private teacherService: UserService
  ) {
    this.teacherForm = fb.group({
      user_name: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', Validators.minLength(9)],
      password: ['', Validators.required],
      user_type: ['', Validators.required],
      dance_style_id: ['', Validators.required],
    });
    this.teacherForm.patchValue(data);
    this.classService.getAllDanceStyle().subscribe((data) => {
      this.dance_styles = data;
      console.log(data);
    });
  }

  ngOnInit(): void {

    if (this.teacherId) {
      this.teacherModel.getUser(this.teacherId).subscribe((data) => {
        if (data) {
          this.user = data;
          this.teacherForm.patchValue(this.user);
        }
      });
    }
  }
  saveClick() {
    console.log(this.teacherForm.value);
    const newUser = new User(this.teacherForm.value);
    console.log(newUser);
    this.teacherService.saveUser(newUser).subscribe((x) => {
      console.log(x);

    });
    this.dialogRef.close();
    this.alert();
    this.refresh();

  }

  cancelClick() {
    this.snackBar.open('cancelado', 'Ok', { duration: 1000 });
    this.dialogRef.close();
  }

  cleanForm() {
    Swal.fire('Datos Reseteados');
    this.teacherForm.reset();
  }
  private alert() {
    Swal.fire({
      title: '!Profesor Creado',
      icon: 'success',
      confirmButtonText: 'Cerrar',
      timer: 1500,
    });
  }
  private refresh(): void {
    window.location.reload();
  }
  getError(el) {
    switch (el) {
      case 'user_name':
        if (this.teacherForm.get('user_name').hasError('required')) {
          return 'Usuario requerido';
        }
        break;
      case 'name':
        if (this.teacherForm.get('name').hasError('required')) {
          return 'Nombre requerido';
        }
        break;
      case 'last_name':
        if (this.teacherForm.get('last_name').hasError('required')) {
          return 'Apellidos requerido';
        }
        break;
      case 'email':
        if (this.teacherForm.get('email').hasError('required')) {
          return 'Email requerido';
        }
        break;
      case 'phone':
        if (this.teacherForm.get('phone').hasError('required')) {
          return 'Teléfono requerido';
        }
        break;
      case 'password':
        if (this.teacherForm.get('password').hasError('required')) {
          return 'Password requerido';
        }
        break;
      case 'user_type':
        if (this.teacherForm.get('user_type').hasError('required')) {
          return 'Tipo de usuario requerido';
        }
        break;
      case 'dance_style_id':
        if (this.teacherForm.get('dance_style_id').hasError('required')) {
          return 'Estilo requerido';
        }
        break;
      default:
        return '';
    }
  }
}
