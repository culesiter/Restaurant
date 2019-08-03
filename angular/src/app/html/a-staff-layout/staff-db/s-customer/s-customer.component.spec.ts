import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SCustomerComponent } from './s-customer.component';

describe('SCustomerComponent', () => {
  let component: SCustomerComponent;
  let fixture: ComponentFixture<SCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
