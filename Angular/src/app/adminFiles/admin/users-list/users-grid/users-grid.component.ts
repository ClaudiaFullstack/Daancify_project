import { Component, OnInit, Input, ViewChild, Output, EventEmitter, NgModule } from '@angular/core';
import { User } from '../../../../models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss']
})
export class UsersGridComponent implements OnInit {

  displayedColumns = ['user_id', 'user_name', 'name', 'last_name', 'email', 'phone', 'password',
   'user_type', 'dance_style_name'];
  theUsersListDataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() set data(value: User[]) {
    this.theUsersListDataSource.data = [...value];
  }

  @Output() rowClick = new EventEmitter<User>(false);

  constructor() {
  }

  ngOnInit() {
    this.theUsersListDataSource.paginator = this.paginator;
    this.theUsersListDataSource.sort = this.sort;
  }

  rowClicked(item: User) {
    this.rowClick.emit(item);
  }
  refresh(): void {
    window.location.reload();
}

}

