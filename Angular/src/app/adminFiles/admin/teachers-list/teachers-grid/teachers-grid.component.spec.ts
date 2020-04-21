/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TeachersGridComponent } from './teachers-grid.component';

describe('TeachersGridComponent', () => {
  let component: TeachersGridComponent;
  let fixture: ComponentFixture<TeachersGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
