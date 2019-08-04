import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SViewsalaryComponent } from './s-viewsalary.component';

describe('SViewsalaryComponent', () => {
  let component: SViewsalaryComponent;
  let fixture: ComponentFixture<SViewsalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SViewsalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SViewsalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
