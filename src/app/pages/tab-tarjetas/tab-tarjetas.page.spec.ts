import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTarjetasPage } from './tab-tarjetas.page';

describe('TabTarjetasPage', () => {
  let component: TabTarjetasPage;
  let fixture: ComponentFixture<TabTarjetasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabTarjetasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabTarjetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
