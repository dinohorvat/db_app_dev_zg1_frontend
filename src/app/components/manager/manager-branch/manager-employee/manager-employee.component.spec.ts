import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEmployeeComponent } from './manager-employee.component';

describe('ManagerEmployeeComponent', () => {
  let component: ManagerEmployeeComponent;
  let fixture: ComponentFixture<ManagerEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
