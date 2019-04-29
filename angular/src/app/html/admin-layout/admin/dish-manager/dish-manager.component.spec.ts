import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishManagerComponent } from './dish-manager.component';

describe('DishManagerComponent', () => {
  let component: DishManagerComponent;
  let fixture: ComponentFixture<DishManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
