import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTeacherComponent } from './student-teacher.component';

describe('StudentTeacherComponent', () => {
  let component: StudentTeacherComponent;
  let fixture: ComponentFixture<StudentTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
