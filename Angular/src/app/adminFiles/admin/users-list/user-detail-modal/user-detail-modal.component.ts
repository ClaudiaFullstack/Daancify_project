import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../../../models/user';
import { Validators, FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../core/services/user.service';
import { DanceStyle } from 'src/app/models/danceStyle';
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
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.scss'],
})
export class UserDetailModalComponent implements OnInit {
  userId: string;
  user: User;
  dance_styles: DanceStyle;
  userForm: FormGroup;
  srcResult: any;
  matcher = new MyErrorStateMatcher(); // < -- todos los form
  // va con un codigo de arriba del @Component

  constructor(
    public dialogRef: MatDialogRef<UserDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    fb: FormBuilder,
    private userModel: UserService,
    private snackBar: MatSnackBar,
    private classService: ClassService,

  ) {
    this.userForm = fb.group({
      user_id: [''],
      user_name: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', Validators.minLength(9)],
      password: ['', Validators.required],
      user_type: ['', Validators.required],
      dance_style_id: [''],
      dance_style_name: ['', Validators.required],
    });
    this.userForm.patchValue(data);
    this.classService.getAllDanceStyle().subscribe((data) => {
      this.dance_styles = data;
      console.log(data);
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.userModel.getUser(this.userId).subscribe((data) => {
        if (data) {
          this.user = data;
          this.userForm.patchValue(this.user);
        }
      });
    }
  }

  editClick(id) {
    console.log(id)
    this.userModel.updateUser(this.userForm.value).subscribe(x => {
      if (x) {
        this.snackBar.open('Usuario editado', 'Ok', {
          duration: 2000,
        });
      }
      this.dialogRef.close(x);
      this.refresh();
    });
}

  deleteClick(id) {
    Swal.fire({
      title: 'Estás Seguro?',
      text: 'Puede liarse una buena!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, Borralo!',
    }).then((result) => {
      if (result.value) {
        this.userModel.delete(id).subscribe((data) => {
          console.log('borrado');
          Swal.fire('Borrado!', 'Su usuario ha sido Borrado.', 'success');
          this.alert();
          this.dialogRef.close();
        });
      } else {
        Swal.fire({
          title: '!Cancelado¡',
          icon: 'success',
          confirmButtonText: 'Cerrar',
          timer: 2500,
        });
        this.dialogRef.close();
      }
      this.refresh();
    });
  }
  cancelClick() {
    this.snackBar.open('cancelado', 'Ok', { duration: 1000 });
    this.dialogRef.close();
  }

  cleanForm() {
    Swal.fire('Datos Reseteados');
    this.userForm.reset();
  }
  private alert() {
    Swal.fire({
      title: '!Usuario actualizado¡',
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
        if (this.userForm.get('user_name').hasError('required')) {
          return 'Username requerido';
        }
        break;
      case 'name':
        if (this.userForm.get('name').hasError('required')) {
          return 'name requerido';
        }
        break;
      case 'last_name':
        if (this.userForm.get('last_name').hasError('required')) {
          return 'last_name requerido';
        }
        break;
      case 'email':
        if (this.userForm.get('email').hasError('required')) {
          return 'email requerido';
        }
        break;
      case 'phone':
        if (this.userForm.get('phone').hasError('required')) {
          return 'phone requerido';
        }
        break;
      case 'password':
        if (this.userForm.get('password').hasError('required')) {
          return 'password requerido';
        }
        break;
      case 'user_type':
        if (this.userForm.get('user_type').hasError('required')) {
          return 'user_type requerido';
        }
        break;
      case 'dance_style_id':
        if (this.userForm.get('dance_style_id').hasError('required')) {
          return 'dance_style_id requerido';
        }
        break;
      default:
        return '';
    }
  }
}
