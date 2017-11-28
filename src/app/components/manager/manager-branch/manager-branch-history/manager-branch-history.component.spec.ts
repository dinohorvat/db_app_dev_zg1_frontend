import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBranchHistoryComponent } from './manager-branch-history.component';

describe('ManagerBranchHistoryComponent', () => {
  let component: ManagerBranchHistoryComponent;
  let fixture: ComponentFixture<ManagerBranchHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerBranchHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBranchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
