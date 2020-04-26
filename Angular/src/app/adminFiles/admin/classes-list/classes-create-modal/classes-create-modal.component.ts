import {
  Component,
  OnInit,
  Inject,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { Class } from '../../../../models/class';
import { DanceStyle } from 'src/app/models/danceStyle';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassService } from 'src/app/core/services/class.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2';
import { SchoolDanceService } from 'src/app/core/services/schoolDance.service';
import { AdminGetSchool } from '../../../../models/adminGetSchool';
import { AdminGetTeacher } from 'src/app/models/AdminGetTeacher';
import { UserService } from '../../../../core/services/user.service';
import { MatTableDataSource } from '@angular/material/table';

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
  selector: 'app-classes-create-modal',
  templateUrl: './classes-create-modal.component.html',
  styleUrls: ['./classes-create-modal.component.scss'],
})
export class ClassesCreateModalComponent implements OnInit {
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
    private userService: UserService
  ) {
    this.classForm = fb.group({
      class_id: [''],
      dance_school_id: ['', Validators.required],
      teacher_id: ['', Validators.required],
      class_name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
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

  saveClick() {
    // console.log(this.classForm);
    // if (this.classForm.valid) {
    const newClass = new Class(this.classForm.value);
    this.classModel.createClassAdmin(newClass).subscribe((x) => {

    });
    this.alert();
    this.dialogRef.close();
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
      title: '!Clase Creada¡',
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
      case 'dance_school_id':
        if (this.classForm.get('dance_school_id').hasError('required')) {
          return 'Nombre de Escuela requerida';
        }
        break;
      case 'teacher_id':
        if (this.classForm.get('teacher_id').hasError('required')) {
          return 'Nombre de Profesor requerido';
        }
        break;
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
      case 'modality':
        if (this.classForm.get('modality').hasError('required')) {
          return 'Modalidad requerida';
        }
        break;
      case 'price':
        if (this.classForm.get('price').hasError('required')) {
          return 'Precio requerido';
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
      case 'dance_style_id':
        if (this.classForm.get('dance_style_id').hasError('required')) {
          return 'Estilo requerido';
        }
        break;
      default:
        return '';
    }
  }
}
