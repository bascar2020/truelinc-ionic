import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEditPage } from './tab-edit.page';

describe('TabEditPage', () => {
  let component: TabEditPage;
  let fixture: ComponentFixture<TabEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
