import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTeacherClassComponent } from './student-teacher-class.component';

describe('StudentTeacherClassComponent', () => {
  let component: StudentTeacherClassComponent;
  let fixture: ComponentFixture<StudentTeacherClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTeacherClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTeacherClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
