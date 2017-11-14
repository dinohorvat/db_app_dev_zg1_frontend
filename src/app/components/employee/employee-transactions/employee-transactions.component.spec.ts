import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTransactionsComponent } from './employee-transactions.component';

describe('EmployeeTransactionsComponent', () => {
  let component: EmployeeTransactionsComponent;
  let fixture: ComponentFixture<EmployeeTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
