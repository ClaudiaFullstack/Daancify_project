import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/user';
import { DanceStyle } from 'src/app/models/danceStyle';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDetailModalComponent } from '../user-detail-modal/user-detail-modal.component';
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
  selector: 'app-user-create-modal',
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.scss']
})
export class UserCreateModalComponent implements OnInit {
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
    private userService: UserService
  ) {
    this.userForm = fb.group({
      user_name: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', Validators.minLength(9)],
      password: ['', Validators.required],
      user_type: ['', Validators.required],
      dance_style_id: [''],
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
  saveClick() {
    console.log(this.userForm.value);
    const newUser = new User(this.userForm.value);
    console.log(newUser);
    this.userService.saveUser(newUser).subscribe((x) => {
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
    this.userForm.reset();
  }
  private alert() {
    Swal.fire({
      title: '!Usuario Creado!',
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
