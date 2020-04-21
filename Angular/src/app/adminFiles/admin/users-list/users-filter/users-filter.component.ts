import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']
})
export class UsersFilterComponent implements OnInit {

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
