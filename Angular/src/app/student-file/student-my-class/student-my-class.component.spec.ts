import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMyClassComponent } from './student-my-class.component';

describe('StudentMyClassComponent', () => {
  let component: StudentMyClassComponent;
  let fixture: ComponentFixture<StudentMyClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMyClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMyClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
