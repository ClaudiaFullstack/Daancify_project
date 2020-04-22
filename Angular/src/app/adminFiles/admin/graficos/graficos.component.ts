import { Component, OnInit } from '@angular/core';


import { ChartService } from '../../../core/services/chart.service';
import { Graficas } from '../../../models/graficas';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css'],
})
export class GraficosComponent implements OnInit {
// USUARIOS
createrUsers: Graficas;
activeUsers: Graficas;
erasedUsers: Graficas;
// CLASES
createdClasses: Graficas;
activeClasses: Graficas;
erasedClasses: Graficas;
createdClasses2020: Graficas;
// PROFESORES
createdTeachers: Graficas;
activeTeachers: Graficas;
ErasedTeachers: Graficas;


  // tslint:disable-next-line: variable-name
  constructor(private _chart: ChartService) {}

  ngOnInit() {
    // Usuarios
    this._chart.getCreatedUsers().subscribe((data) => {
  const newDATA1 = new Graficas(data);
  this.createrUsers = newDATA1;
  console.log(this.createrUsers);
});
    this._chart.getActiveUsers().subscribe((data) => {
  const newDATA2 = new Graficas(data);
  this.activeUsers = newDATA2;
  console.log(this.activeUsers);
});
    this._chart.getErasedUsers().subscribe((data) => {
  const newDATA2 = new Graficas(data);
  this.erasedUsers = newDATA2;
  console.log(this.erasedUsers);
});
    // Clases
    this._chart.getCreatedClasses().subscribe((data) => {
  const newDATA2 = new Graficas(data);
  this.createdClasses = newDATA2;
  console.log(this.createdClasses);
});
    this._chart.getActiveClasses().subscribe((data) => {
  const newDATA2 = new Graficas(data);
  this.activeClasses = newDATA2;
  console.log(this.activeClasses);
});
    this._chart.getErasedClasses().subscribe((data) => {
  const newDATA2 = new Graficas(data);
  this.erasedClasses = newDATA2;
  console.log(this.erasedClasses);
});
    this._chart.getCreatedClasses2020().subscribe((data) => {
  const newDATA2 = new Graficas(data);
  this.createdClasses2020 = newDATA2;
  console.log(this.createdClasses2020);
});
    // Profesores
    this._chart.getCreatedTeachers().subscribe((data) => {
  const newDATA2 = new Graficas(data);
  this.createdTeachers = newDATA2;
  console.log(this.createdTeachers);
});
    this._chart.getActiveTeachers().subscribe((data) => {
  const newDATA2 = new Graficas(data);
  this.activeTeachers = newDATA2;
  console.log(this.activeTeachers);
});
    this._chart.getErasedTeachers().subscribe((data) => {
  const newDATA2 = new Graficas(data);
  this.ErasedTeachers = newDATA2;
  console.log(this.ErasedTeachers);
});
}
}
