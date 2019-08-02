import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishStatisticalComponent } from './dish-statistical.component';

describe('DishStatisticalComponent', () => {
  let component: DishStatisticalComponent;
  let fixture: ComponentFixture<DishStatisticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishStatisticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishStatisticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
