import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-teachers-filter',
  templateUrl: './teachers-filter.component.html',
  styleUrls: ['./teachers-filter.component.scss']
})
export class TeachersFilterComponent implements OnInit {


  @Output() searchClick = new EventEmitter<User>(false);
  @Output() clearClick = new EventEmitter<User>(false);
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = fb.group({
      user_name: [''],
      name: [''],
      last_name: [''],
      email: [''],
      phone: ['']
    });
  }

  ngOnInit() {
  }

  clearForm() {
    this.filterForm.reset();
    this.clearClick.emit();
  }

  search() {
    this.searchClick.emit(this.filterForm.value);
  }

}
