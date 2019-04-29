import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiphongComponent } from './loaiphong.component';

describe('LoaiphongComponent', () => {
  let component: LoaiphongComponent;
  let fixture: ComponentFixture<LoaiphongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiphongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiphongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
