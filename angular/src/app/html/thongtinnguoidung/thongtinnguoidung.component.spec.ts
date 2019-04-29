import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtinnguoidungComponent } from './thongtinnguoidung.component';

describe('ThongtinnguoidungComponent', () => {
  let component: ThongtinnguoidungComponent;
  let fixture: ComponentFixture<ThongtinnguoidungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongtinnguoidungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongtinnguoidungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
