import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsManagerComponent } from './bills-manager.component';

describe('BillsManagerComponent', () => {
  let component: BillsManagerComponent;
  let fixture: ComponentFixture<BillsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
