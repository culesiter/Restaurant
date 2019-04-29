import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishLishComponent } from './dish-lish.component';

describe('DishLishComponent', () => {
  let component: DishLishComponent;
  let fixture: ComponentFixture<DishLishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishLishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishLishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
