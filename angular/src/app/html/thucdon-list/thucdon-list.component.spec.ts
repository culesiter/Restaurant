import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThucdonListComponent } from './thucdon-list.component';

describe('ThucdonListComponent', () => {
  let component: ThucdonListComponent;
  let fixture: ComponentFixture<ThucdonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThucdonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThucdonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
