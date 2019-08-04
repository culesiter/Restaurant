import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SScheduleComponent } from './s-schedule.component';

describe('SScheduleComponent', () => {
  let component: SScheduleComponent;
  let fixture: ComponentFixture<SScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
