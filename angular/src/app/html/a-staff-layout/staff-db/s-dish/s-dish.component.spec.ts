import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SDishComponent } from './s-dish.component';

describe('SDishComponent', () => {
  let component: SDishComponent;
  let fixture: ComponentFixture<SDishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SDishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
