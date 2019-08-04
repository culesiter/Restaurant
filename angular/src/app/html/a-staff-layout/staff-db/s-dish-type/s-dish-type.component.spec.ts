import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SDishTypeComponent } from './s-dish-type.component';

describe('SDishTypeComponent', () => {
  let component: SDishTypeComponent;
  let fixture: ComponentFixture<SDishTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SDishTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SDishTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
