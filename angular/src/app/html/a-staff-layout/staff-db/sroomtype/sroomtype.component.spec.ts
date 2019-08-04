import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SroomtypeComponent } from './sroomtype.component';

describe('SroomtypeComponent', () => {
  let component: SroomtypeComponent;
  let fixture: ComponentFixture<SroomtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SroomtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SroomtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
