import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidRoomPage } from './raid-room.page';

describe('RaidRoomPage', () => {
  let component: RaidRoomPage;
  let fixture: ComponentFixture<RaidRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaidRoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaidRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
