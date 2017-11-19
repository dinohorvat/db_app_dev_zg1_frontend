import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTransactionsComponent } from './manager-transactions.component';

describe('ManagerTransactionsComponent', () => {
  let component: ManagerTransactionsComponent;
  let fixture: ComponentFixture<ManagerTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
