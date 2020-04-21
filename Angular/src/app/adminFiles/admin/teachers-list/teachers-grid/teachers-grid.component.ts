import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-teachers-grid',
  templateUrl: './teachers-grid.component.html',
  styleUrls: ['./teachers-grid.component.scss']
})
export class TeachersGridComponent implements OnInit {
  displayedColumns = ['user_id', 'user_name', 'name', 'last_name', 'email', 'phone', 'password', 'user_type', 'dance_style_id', 'avatar'];
  theUsersListDataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() set data(value: User[]) {
    this.theUsersListDataSource.data = [...value];
  }

  @Output() rowClick = new EventEmitter<User>(false);

  constructor() { }

  ngOnInit() {
    this.theUsersListDataSource.paginator = this.paginator;
    this.theUsersListDataSource.sort = this.sort;
  }

  rowClicked(item: User) {
    this.rowClick.emit(item);
  }

}

