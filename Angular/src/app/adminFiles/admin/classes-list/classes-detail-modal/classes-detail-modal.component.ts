import { OnInit, Component, Inject, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Class } from 'src/app/models/class';
import { DanceStyle } from 'src/app/models/danceStyle';
import { SchoolDance } from 'src/app/models/schoolDance';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassesCreateModalComponent } from '../classes-create-modal/classes-create-modal.component';
import { ClassService } from 'src/app/core/services/class.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { SchoolDanceService } from 'src/app/core/services/schoolDance.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { AdminGetSchool } from 'src/app/models/adminGetSchool';
import { AdminGetTeacher } from 'src/app/models/AdminGetTeacher';
import { UserService } from 'src/app/core/services/user.service';



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
  selector: 'app-classes-detail-modal',
  templateUrl: './classes-detail-modal.component.html',
  styleUrls: ['./classes-detail-modal.component.scss'],
})
export class ClassesDetailModalComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  class: Class[];

  dance_styles: DanceStyle;
  danceSchools: AdminGetSchool;
  teachers: AdminGetTeacher;
  classForm: FormGroup;

  // Date a iso
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  constructor(
    public dialogRef: MatDialogRef<ClassesCreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Class,
    fb: FormBuilder,
    private classModel: ClassService,
    private snackBar: MatSnackBar,
    private classService: ClassService,
    private schoolDanceService: SchoolDanceService,
    private userService: UserService,
  ) {

    this.classForm = fb.group({
      class_id: [''],
      dance_school_id: [''],
      teacher_id: [''],
      class_name: ['', Validators.maxLength(50)],
      location: ['', Validators.maxLength(50)],
      description: ['', Validators.maxLength(100)],
      modality: ['', Validators.required],
      price: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      start_hour: ['', Validators.required],
      end_hour: ['', Validators.required],
      periodicity: ['', Validators.required],
      level: ['', Validators.required],
      dance_style_id: ['', Validators.required],
    });
    this.classForm.patchValue(data);
    this.classService.getAllDanceStyle().subscribe((style) => {
      this.dance_styles = style;
      console.log(style);
      this.schoolDanceService.getAllSchoolDance().subscribe((school) => {
        this.danceSchools = school;
        console.log(school);
        this.userService.getAdminTeachers().subscribe((teacher) => {
          this.teachers = teacher;
          console.log(teacher);
        });
      });
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

  editClass() {
    console.log(this.classForm.value);
    const editedClass = new Class(this.classForm.value);
    console.log(editedClass);
    this.classService.updateClass(editedClass).subscribe((x) => {
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
    this.classForm.reset();
  }
  private alert() {
    Swal.fire({
      title: '!Clase actualizada¡',
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
      case 'class_name':
        if (this.classForm.get('class_name').hasError('required')) {
          return 'Nombre de clase requerida';
        }
        break;
      case 'location':
        if (this.classForm.get('location').hasError('required')) {
          return 'Ubicación requerida';
        }
        break;
      case 'description':
        if (this.classForm.get('description').hasError('required')) {
          return 'Descripción requerida';
        }
        break;
      case 'start_date':
        if (this.classForm.get('start_date').hasError('required')) {
          return 'Fechas de inicio requerida';
        }
        break;
      case 'end_date':
        if (this.classForm.get('end_date').hasError('required')) {
          return 'Fechas de fin requerida';
        }
        break;
      case 'start_hour':
        if (this.classForm.get('start_hour').hasError('required')) {
          return 'Hora de inicio requerida';
        }
        break;
      case 'end_hour':
        if (this.classForm.get('end_hour').hasError('required')) {
          return 'Hora de fin requerida';
        }
        break;
      case 'periodicity':
        if (this.classForm.get('periodicity').hasError('required')) {
          return 'Periodo requerido';
        }
        break;
      case 'level':
        if (this.classForm.get('level').hasError('required')) {
          return 'Nivel requerido';
        }
        break;
      case 'periodicity':
        if (this.classForm.get('periodicity').hasError('required')) {
          return 'Estilo requerido';
        }
        break;
      default:
        return '';
    }
  }
}
