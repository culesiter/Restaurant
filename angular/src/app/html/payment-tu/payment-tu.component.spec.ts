import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTuComponent } from './payment-tu.component';

describe('PaymentTuComponent', () => {
  let component: PaymentTuComponent;
  let fixture: ComponentFixture<PaymentTuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentTuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
