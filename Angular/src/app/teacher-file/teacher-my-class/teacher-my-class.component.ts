import { Component, OnInit, ViewChild, ChangeDetectorRef, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { Class } from 'src/app/models/class';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ClassService } from 'src/app/core/services/class.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SchoolDance } from 'src/app/models/schoolDance';
import { DanceStyle } from 'src/app/models/danceStyle';
import { SchoolDanceService } from 'src/app/core/services/schoolDance.service';
import { MyErrorStateMatcher } from 'src/app/core/register/register.component';

@Component({
  selector: 'app-teacher-my-class',
  templateUrl: './teacher-my-class.component.html',
  styleUrls: ['./teacher-my-class.component.scss']
})
export class TeacherMyClassComponent implements OnInit, OnChanges {
  @Input() expanded: any

  @Output() opened: EventEmitter<void>
  // Recoger la info del usuario logeado
  user: User;
  matcher = new MyErrorStateMatcher();
  // Guardar todas la clases del profesor
  classList: Class[];

  // Class Form
  classForm: FormGroup;
  schoolDance: SchoolDance;
  schoolDanceHave = true;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  dance_styles: DanceStyle;

  // Paginación
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Class>;

  //Desplegable
  panelOpenState = false;

  constructor(private authService: AuthService, private classService: ClassService,
    private changeDetectorRef: ChangeDetectorRef, fb: FormBuilder, private schoolDanceService: SchoolDanceService, ) {
    this.user = authService.getUser().user;

    this.recharge();

    // Para recoger todas las escuelas de danza para el form de class (select)

    this.schoolDanceService.getAllSchoolDance().subscribe((data) => {

      this.schoolDance = data;

    });

    // Para recoger todos los estilos de bailes para el form de class y user (select)
    this.classService.getAllDanceStyle().subscribe((data) => {
      this.dance_styles = data;

    });

    // Formulario de Clases
    this.classForm = fb.group({
      class_id: [""],
      dance_school_id: [""],
      location: [""],
      class_name: [''],
      description: [""],
      modality: [""],
      price: [""],
      start_date: [""],
      end_date: [""],
      start_hour: [""],
      end_hour: [""],
      periodicity: [""],
      level: [''],
      dance_style_id: [""],
    });

  }

  ngOnInit() {

  }
  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {

  }


  createClass() {
    const newClass = new Class(this.classForm.value);
    if (!this.schoolDanceHave) {
      newClass.dance_school_id = null;
    }
    console.log(newClass);
    if (newClass.class_id) {
      this.classService.updateClass(newClass).subscribe(data => {
        this.recharge();
      })
    } else {
      const teacher_id = this.user.user_id;
      this.classService.createClass(newClass, teacher_id).subscribe((data) => {
        this.recharge();
      });
    }
    this.recharge();
  }
  editClass(card) {

    card.start_date = card.start_date.substr(0, 10);
    card.end_date = card.end_date.substr(0, 10);

    this.classForm.patchValue(card);

    this.panelOpenState = true;
  }

  deleteClass(id) {
    this.classService.deleteClass(id).subscribe(data => {
      this.recharge();
    })

  }

  SchoolDance() {
    this.schoolDanceHave = !this.schoolDanceHave;
  }


  private recharge() {
    this.classService.getClassTeacher(this.user.user_id).subscribe(data => {
      this.classList = data;
      console.log(data);
      this.dataSource = new MatTableDataSource<Class>(this.classList);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      this.changeDetectorRef.detectChanges();
    })
  }
  beforePanelClosed(panel) {
    this.panelOpenState = false;
  }
  beforePanelOpened(panel) {
    this.panelOpenState = true;
  }
}


