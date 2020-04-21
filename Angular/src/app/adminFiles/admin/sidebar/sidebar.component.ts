import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { Moment } from 'moment';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  @ViewChild('myCalendar', { static: true })
  myCalendar: CalendarComponent;

  dateSelected(value: Moment) {
    alert(value);
  }
  constructor() { }

  ngOnInit() {
  }

}
