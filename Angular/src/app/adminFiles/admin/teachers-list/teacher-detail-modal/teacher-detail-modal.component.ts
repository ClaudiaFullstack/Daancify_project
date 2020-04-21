import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/user';
import { DanceStyle } from 'src/app/models/danceStyle';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassService } from 'src/app/core/services/class.service';

@Component({
  selector: 'app-teacher-detail-modal',
  templateUrl: './teacher-detail-modal.component.html',
  styleUrls: ['./teacher-detail-modal.component.scss']
})
export class TeacherDetailModalComponent implements OnInit {
  teacherId: string;
  user: User[];
  dance_styles: DanceStyle;
  teacherForm: FormGroup;
  srcResult: any;


  constructor(
    public dialogRef: MatDialogRef<TeacherDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    fb: FormBuilder,
    private teacherModel: UserService,
    private snackBar: MatSnackBar,
    private classService: ClassService
  ) {
    this.teacherForm = fb.group({
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
    this.teacherForm.patchValue(data);
    this.classService.getAllDanceStyle().subscribe((data) => {
      this.dance_styles = data;
      console.log(data);
    });
  }

  ngOnInit(): void {

    if (this.teacherId) {
      this.teacherModel.getTeachers().subscribe((data) => {
        if (data) {
          this.user = data;
          this.teacherForm.patchValue(this.user);
        }
      });
    }
  }

  saveClick() {
    console.log(this.teacherForm);
    if (this.teacherForm.valid) {
      const teacherEdit = new User(this.teacherForm.value);
      this.teacherModel.updateUser(teacherEdit).subscribe((x) => { // hacer recargar y que entre a ok
        if (x) {
          this.snackBar.open('User save successfully', 'Ok', {
            duration: 2500,
          });
        }
        this.dialogRef.close(x);
      });
    }
  }
  deleteUser(id) {
    this.teacherModel.delete(id).subscribe((data) => {
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
    this.teacherForm.reset();
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
