import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDbComponent } from './staff-db.component';

describe('StaffDbComponent', () => {
  let component: StaffDbComponent;
  let fixture: ComponentFixture<StaffDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
