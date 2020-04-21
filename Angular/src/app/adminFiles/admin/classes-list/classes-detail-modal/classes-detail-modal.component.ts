import { Component, OnInit, Inject } from '@angular/core';
import { Class } from '../../../../models/class';
import { DanceStyle } from 'src/app/models/danceStyle';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassService } from 'src/app/core/services/class.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-classes-detail-modal',
  templateUrl: './classes-detail-modal.component.html',
  styleUrls: ['./classes-detail-modal.component.scss']
})
export class ClassesDetailModalComponent implements OnInit {
  class_id: any;
  class: Class[];
  dance_styles: DanceStyle;
  classForm: FormGroup;
  srcResult: any;


  constructor(
    public dialogRef: MatDialogRef<ClassesDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Class,
    fb: FormBuilder,
    private classModel: ClassService,
    private snackBar: MatSnackBar,
    private classService: ClassService
  ) {
    this.classForm = fb.group({
      class_id: [''], // validadores ??
      dance_school_id: [''],
      class_name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      start_date: [''], // validadores ??
      end_date: [''], // validadores ??
      start_hour: [''], // validadores ??
      end_hour: [''], // validadores ??
      periodicity: [''], // validadores ??
      level: [''], // validadores ??
      dance_style_id: [''], // validadores ??
    });
    this.classForm.patchValue(data);
    this.classService.getAllDanceStyle().subscribe((data) => {
      this.dance_styles = data;
      console.log(data);
    });
  }

  ngOnInit(): void {
      this.classModel.getAllClass().subscribe((data) => {
        if (data) {
          this.class = data;
          this.classForm.patchValue(this.class);
        }
      });
  }
// salvar y editar class TODO guardar cambios y desplegable
  saveClick() {
    console.log(this.classForm);
    if (this.classForm.valid) {
      const classEdit = new Class(this.classForm.value);
      this.classModel.updateClass(classEdit).subscribe((x) => { // hacer recargar y que entre a ok
        if (x) {
          this.snackBar.open('User save successfully', 'Ok', {
            duration: 2500,
          });
        }
        this.dialogRef.close(x);
      });
    }
  }
// borrar clase
  deleteUser(id) {
    this.classModel.deleteClass(id).subscribe((data) => {
      console.log('borrado'); // hacer recargar
      if (data) {
        this.snackBar.open('Class Delete', 'Ok', {
          duration: 2500,
        });
      }
      this.dialogRef.close(data);
    });
  }
  cancelClick() {
    this.dialogRef.close();
  }
 // limpiar formulario
   cleanForm() {
    this.classForm.reset();
  }

  // selector de imagen TODO
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

