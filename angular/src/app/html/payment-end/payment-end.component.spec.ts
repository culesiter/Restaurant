import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentEndComponent } from './payment-end.component';

describe('PaymentEndComponent', () => {
  let component: PaymentEndComponent;
  let fixture: ComponentFixture<PaymentEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
