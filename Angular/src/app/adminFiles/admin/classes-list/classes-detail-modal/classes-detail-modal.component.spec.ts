/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClassesDetailModalComponent } from './classes-detail-modal.component';

describe('ClassesDetailModalComponent', () => {
  let component: ClassesDetailModalComponent;
  let fixture: ComponentFixture<ClassesDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
