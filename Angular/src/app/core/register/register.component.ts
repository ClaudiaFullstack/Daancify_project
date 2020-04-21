import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SchoolDanceService } from '../services/schoolDance.service';
import { SchoolDance } from '../../models/schoolDance';
import { ClassService } from '../services/class.service';
import { DanceStyle } from '../../models/danceStyle';
import { Class } from '../../models/class';
import { AuthService } from '../authentication/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/** Error when invalid control is dirty, touched, or submitted. */
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnChanges {
  // Registro Form
  registrationForm: FormGroup;
  dance_styles: DanceStyle;

  // Class Form
  classForm: FormGroup;
  schoolDance: SchoolDance;
  schoolDanceHave = true;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

// Escuela Form
  danceSchoolForm: FormGroup;

  matcher = new MyErrorStateMatcher(); // < -- todos los form
  // va con un codigo de arriba del @Component


  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private schoolDanceService: SchoolDanceService,
    private classService: ClassService,
    private authService: AuthService
  ) {
    // Formulario de Registro
    this.registrationForm = fb.group({
      user_name: [''],
      name: [''],
      last_name: [''],
      email: ['', [Validators.email, Validators.required]],
      phone: [''],
      password: [''],
      user_type: [''],
      dance_style_id: [''],
      avatar: [''],
    });
    // Formulario de Clases
    this.classForm = fb.group({
      dance_school_id: [""],
      location: [""],
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
    // Formulario de escuela de danza
    this.danceSchoolForm = fb.group({
      owned_by_user_id: [''],
      dance_school_name: [''],
      address: [''],
      description: [''],
      phone_dance_school: [''],
      email: ['', [Validators.email, Validators.required]],
    });

    // Para recoger todas las escuelas de danza para el form de class (select)

    this.schoolDanceService.getAllSchoolDance().subscribe((data) => {
      console.log(data);
      this.schoolDance = data;
      console.log(this.schoolDance);
    });

    // Para recoger todos los estilos de bailes para el form de class y user (select)
    this.classService.getAllDanceStyle().subscribe((data) => {
      this.dance_styles = data;
      console.log(data);
    });
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.schoolDanceHave;
  }

  registration() {
    console.log(this.registrationForm.value);
    const newUser = new User(this.registrationForm.value);
    // newUser.avatar = this.registrationForm.controls.avatar.value._fileNames;
    console.log(newUser);
    this.userService.saveUser(newUser).subscribe((x) => {
      console.log(x);
    });
    // this.router.navigate(['/login']);
  }

  createClass() {
    console.log(this.classForm.value);
    // auth.service.ts <- devuelve id del usuario que esta guardado en el local
    // let user_id = getUser();
    const newClass = new Class(this.classForm.value);
    if (!this.schoolDanceHave) {
      newClass.dance_school_id = null;
    }
    console.log(newClass);
    const teacher_id = this.authService.getUser().user.user_id;
    this.classService.createClass(newClass, teacher_id).subscribe((data) => {
      console.log(data);
    });
  }

  createSchoolDance() {
    console.log(this.danceSchoolForm.value);
    // Sacamos el id del usuario que esta creando la escuela de danza
    const owned_by_user_id = this.authService.getUser().user.user_id;
    // Cogemos la info del formulario y la convertimos en un tipo SchoolDance
    const newDanceSchool = new SchoolDance(this.danceSchoolForm.value);
    // Le añadimos el valor del id que recogimos antes
    newDanceSchool.owned_by_user_id = owned_by_user_id;
    this.schoolDanceService.createDanceSchool(newDanceSchool).subscribe(data =>{
      console.log(data);
      // Aqui poner las redirecciones
    })

  }
  SchoolDance() {
    this.schoolDanceHave = !this.schoolDanceHave;
  }
}
