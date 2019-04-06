import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRaidPage } from './add-raid.page';

describe('AddRaidPage', () => {
  let component: AddRaidPage;
  let fixture: ComponentFixture<AddRaidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRaidPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRaidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
