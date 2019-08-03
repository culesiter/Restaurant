import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SBillComponent } from './s-bill.component';

describe('SBillComponent', () => {
  let component: SBillComponent;
  let fixture: ComponentFixture<SBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
