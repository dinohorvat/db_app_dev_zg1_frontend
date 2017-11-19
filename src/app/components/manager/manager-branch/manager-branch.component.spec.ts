import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBranchComponent } from './manager-branch.component';

describe('ManagerBranchComponent', () => {
  let component: ManagerBranchComponent;
  let fixture: ComponentFixture<ManagerBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
