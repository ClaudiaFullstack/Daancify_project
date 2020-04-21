/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClassesFilterComponent } from './classes-filter.component';

describe('ClassesFilterComponent', () => {
  let component: ClassesFilterComponent;
  let fixture: ComponentFixture<ClassesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
