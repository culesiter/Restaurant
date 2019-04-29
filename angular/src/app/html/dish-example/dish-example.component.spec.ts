import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishExampleComponent } from './dish-example.component';

describe('DishExampleComponent', () => {
  let component: DishExampleComponent;
  let fixture: ComponentFixture<DishExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
