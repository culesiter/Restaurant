import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThucdonExampleComponent } from './thucdon-example.component';

describe('ThucdonExampleComponent', () => {
  let component: ThucdonExampleComponent;
  let fixture: ComponentFixture<ThucdonExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThucdonExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThucdonExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
