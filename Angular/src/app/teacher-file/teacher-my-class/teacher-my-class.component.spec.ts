import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMyClassComponent } from './teacher-my-class.component';

describe('TeacherMyClassComponent', () => {
  let component: TeacherMyClassComponent;
  let fixture: ComponentFixture<TeacherMyClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherMyClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMyClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
