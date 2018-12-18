import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSearchPage } from './tab-search.page';

describe('TabSearchPage', () => {
  let component: TabSearchPage;
  let fixture: ComponentFixture<TabSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
