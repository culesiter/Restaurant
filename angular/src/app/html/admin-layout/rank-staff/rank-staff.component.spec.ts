import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankStaffComponent } from './rank-staff.component';

describe('RankStaffComponent', () => {
  let component: RankStaffComponent;
  let fixture: ComponentFixture<RankStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
