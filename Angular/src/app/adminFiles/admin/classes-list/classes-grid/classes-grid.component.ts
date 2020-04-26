import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Class } from 'src/app/models/class';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-classes-grid',
  templateUrl: './classes-grid.component.html',
  styleUrls: ['./classes-grid.component.scss']
})
export class ClassesGridComponent implements OnInit {
  displayedColumns = ['class_id', 'class_name',
  'location', 'description', 'modality', 'price',
     'start_date', 'end_date', 'start_hour', 'end_hour',
         'periodicity', 'level', 'dance_style_id'];
            theClassesListDataSource: MatTableDataSource<Class> = new MatTableDataSource<Class>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() set data(value: Class[]) {
    this.theClassesListDataSource.data = [...value];
  }

  @Output() rowClick = new EventEmitter<Class>(false);

  constructor() { }

  ngOnInit() {
    this.theClassesListDataSource.paginator = this.paginator;
    this.theClassesListDataSource.sort = this.sort;
  }

  rowClicked(item: Class) {
    this.rowClick.emit(item);
  }
  refresh(): void {
    window.location.reload();
}

}
