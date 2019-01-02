import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasListComponent } from './tarjetas-list.component';

describe('TarjetasListComponent', () => {
  let component: TarjetasListComponent;
  let fixture: ComponentFixture<TarjetasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
