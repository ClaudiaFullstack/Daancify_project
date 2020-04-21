import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSchoolComponent } from './teacher-school.component';

describe('TeacherSchoolComponent', () => {
  let component: TeacherSchoolComponent;
  let fixture: ComponentFixture<TeacherSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
