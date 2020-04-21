import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { SchoolDanceService } from 'src/app/core/services/schoolDance.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { SchoolDance } from 'src/app/models/schoolDance';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MyErrorStateMatcher } from 'src/app/core/register/register.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-school',
  templateUrl: './teacher-school.component.html',
  styleUrls: ['./teacher-school.component.scss']
})
export class TeacherSchoolComponent implements OnInit {



  //Desplegable
  @Input() expanded: any
  panelOpenState = false;

  // Recoger la info del usuario logeado
  user: User;

  // Lista de escuela de danza creada por el profesor que esta logeado
  danceSchoolList: SchoolDance[];

  // Paginación
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<SchoolDance>;
  changeDetectorRef: any;

  // Escuela Form
  danceSchoolForm: FormGroup;

  matcher = new MyErrorStateMatcher(); // < -- todos los form
  // va con un codigo de arriba del @Component
  constructor(fb: FormBuilder, private schoolDanceservice: SchoolDanceService, private authService: AuthService,
    private schoolDanceService: SchoolDanceService, ) {

    this.user = authService.getUser().user;


    this.recharge();

    // Formulario de escuela de danza
    this.danceSchoolForm = fb.group({
      dance_school_id: [''],
      owned_by_user_id: [''],
      dance_school_name: [''],
      address: [''],
      description: [''],
      phone_dance_school: [''],
      email: ['', [Validators.email, Validators.required]],
    });
  }

  ngOnInit(): void {
    this.changeDetectorRef?.detectChanges();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }


  createSchoolDance() {
    const owned_by_user_id = this.authService.getUser().user.user_id;
    const newDanceSchool = new SchoolDance(this.danceSchoolForm.value);
    newDanceSchool.owned_by_user_id = owned_by_user_id;
    if (!newDanceSchool.dance_school_id) {
      this.schoolDanceService.createDanceSchool(newDanceSchool).subscribe(data => {
        this.recharge();
      })
    } else {
      this.schoolDanceservice.updateDanceSchool(newDanceSchool).subscribe(data => {
        this.recharge();
      })
    }

  }
  editarDanceSchool(card) {
    console.log(card)
    this.danceSchoolForm.patchValue(card);
    this.panelOpenState = true;

  }

  deleteDanceSchool(id) {
    this.schoolDanceService.deleteDanceSchool(id).subscribe(data => {
      this.recharge();
    })
  }


  //Panel cerrar y abrilo
  beforePanelClosed(panel) {
    this.panelOpenState = false;

  }
  beforePanelOpened(panel) {
    this.panelOpenState = true;
  }

  private recharge() {
    this.schoolDanceservice.getSchoolDancesbyTeacher(this.user.user_id).subscribe(data => {
      this.danceSchoolList = data;
      this.dataSource = new MatTableDataSource<SchoolDance>(this.danceSchoolList);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    })
  }

}
