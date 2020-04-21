import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../../../models/user';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../core/services/user.service';
import { DanceStyle } from 'src/app/models/danceStyle';
import { ClassService } from 'src/app/core/services/class.service';

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


  constructor(
    public dialogRef: MatDialogRef<UserDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    fb: FormBuilder,
    private userModel: UserService,
    private snackBar: MatSnackBar,
    private classService: ClassService
  ) {
    this.userForm = fb.group({
      user_id: [''], // validadores ??
      user_name: [''],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      user_type: ['', Validators.required],
      dance_style_id: [''], // validadores ??
      avatar: [''], // validadores ??
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
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);

      this.userModel.saveUser(this.userForm.value).subscribe(x => {
        if (x) {
          this.snackBar.open('User save successfully', 'Ok', {
            duration: 2000,
          });
        }
        this.dialogRef.close(x);
      });

    }
  }

  deleteUser(id) {
    this.userModel.delete(id).subscribe((data) => {
      console.log('borrado'); // hacer recargar
      if (data) {
        this.snackBar.open('User Delete', 'Ok', {
          duration: 2500,
        });
      }
      this.dialogRef.close(data);
    });
  }
  cancelClick() {
    this.dialogRef.close();
  }

  cleanForm() {
    this.userForm.reset();
  }
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }


}

// private function recharge() { //para recargar la página ---falta

// }
