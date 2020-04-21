/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TeachersFilterComponent } from './teachers-filter.component';

describe('TeachersFilterComponent', () => {
  let component: TeachersFilterComponent;
  let fixture: ComponentFixture<TeachersFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
