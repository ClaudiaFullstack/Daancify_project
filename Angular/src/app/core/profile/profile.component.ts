import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { DanceStyle } from 'src/app/models/danceStyle';
import { MyErrorStateMatcher } from '../register/register.component';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../services/class.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: number;
  // Registro Form
  registrationForm: FormGroup;
  dance_styles: DanceStyle;
  matcher = new MyErrorStateMatcher(); // < -- todos los form
  // va con un codigo de arriba del @Component

  // Image
  images: any;
  imgForm: FormGroup;


  constructor(fb: FormBuilder, private userService: UserService, private routes: ActivatedRoute, private classService: ClassService,
    private router: Router) {

    this.classService.getAllDanceStyle().subscribe((data) => {
      this.dance_styles = data;
    });

    // Formulario de Registro
    this.registrationForm = fb.group({
      user_id: [''],
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

    this.imgForm = fb.group({
      avatar: ['']
    })

    this.recharge();
  }

  ngOnInit(): void {

  }
  registration() {
    const newUser = new User(this.registrationForm.value);
    console.log(newUser);


    this.userService.updateUser(newUser).subscribe(data => {

      this.recharge();

    })
    this.alert();
  }
  //Image

  onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.images);
    this.userService.updateFile(formData, this.id).subscribe(data => {
      console.log(data);
    })
  }

  onUpload(event) {
    this.images = event.target.files[0];
  }





  //PRIVATE FUNCTION

  private recharge() {
    this.routes.params.subscribe(params => {
      this.id = params.id;
      this.userService.getUserId(this.id).subscribe(data => {
        const editUser = new User(data[0]);
        this.registrationForm.patchValue(editUser);
      })
    })
  }

  private alert() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: '¡Perfil modificado!'
    })
  }
}
