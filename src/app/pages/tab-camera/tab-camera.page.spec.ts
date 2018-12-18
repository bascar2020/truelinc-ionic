import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCameraPage } from './tab-camera.page';

describe('TabCameraPage', () => {
  let component: TabCameraPage;
  let fixture: ComponentFixture<TabCameraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCameraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCameraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
