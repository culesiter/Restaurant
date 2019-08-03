import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SRoomComponent } from './s-room.component';

describe('SRoomComponent', () => {
  let component: SRoomComponent;
  let fixture: ComponentFixture<SRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
