import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Class } from 'src/app/models/class';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DanceStyle } from 'src/app/models/danceStyle';
import { ClassService } from 'src/app/core/services/class.service';
import { StudentClass } from 'src/app/models/studentClass';

@Component({
  selector: 'app-classes-filter',
  templateUrl: './classes-filter.component.html',
  styleUrls: ['./classes-filter.component.scss']
})
export class ClassesFilterComponent implements OnInit {

  dance_styles: DanceStyle;
  @Output() searchClick = new EventEmitter<Class>(false);
  @Output() clearClick = new EventEmitter<Class>(false);
  filterForm: FormGroup;

  constructor(private fb: FormBuilder, private classService: ClassService) {
    this.filterForm = fb.group({
      class_name: [''],
      location: [''],
      start_date: [''],
      level: [''],
      dance_style_id: ['']
    });
    // Para recoger todos los estilos de bailes para el form de class y user (select)
    this.classService.getAllDanceStyle().subscribe((data) => {
      this.dance_styles = data;

    });
  }

  ngOnInit() {
  }

  clearForm() {
    this.filterForm.reset();
    this.clearClick.emit();
  }

  search() {
    const newFilter = new StudentClass(this.filterForm.value);
    console.log(newFilter)
    this.searchClick.emit(newFilter);
  }

}
