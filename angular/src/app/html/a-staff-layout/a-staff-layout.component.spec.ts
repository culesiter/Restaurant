import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AStaffLayoutComponent } from './a-staff-layout.component';

describe('AStaffLayoutComponent', () => {
  let component: AStaffLayoutComponent;
  let fixture: ComponentFixture<AStaffLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AStaffLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AStaffLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
