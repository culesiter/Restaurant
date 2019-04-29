import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UudaiComponent } from './uudai.component';

describe('UudaiComponent', () => {
  let component: UudaiComponent;
  let fixture: ComponentFixture<UudaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UudaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UudaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
