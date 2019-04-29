import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GioithieuphongComponent } from './gioithieuphong.component';

describe('GioithieuphongComponent', () => {
  let component: GioithieuphongComponent;
  let fixture: ComponentFixture<GioithieuphongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GioithieuphongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GioithieuphongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
