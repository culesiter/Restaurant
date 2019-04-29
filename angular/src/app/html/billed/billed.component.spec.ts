import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilledComponent } from './billed.component';

describe('BilledComponent', () => {
  let component: BilledComponent;
  let fixture: ComponentFixture<BilledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
