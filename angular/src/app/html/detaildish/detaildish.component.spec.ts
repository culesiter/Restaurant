import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildishComponent } from './detaildish.component';

describe('DetaildishComponent', () => {
  let component: DetaildishComponent;
  let fixture: ComponentFixture<DetaildishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaildishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaildishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
