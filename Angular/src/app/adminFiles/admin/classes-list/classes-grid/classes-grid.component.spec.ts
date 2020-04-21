/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClassesGridComponent } from './classes-grid.component';

describe('ClassesGridComponent', () => {
  let component: ClassesGridComponent;
  let fixture: ComponentFixture<ClassesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
