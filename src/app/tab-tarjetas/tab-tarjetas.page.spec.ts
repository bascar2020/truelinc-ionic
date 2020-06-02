import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabTarjetasPage } from './tab-tarjetas.page';

describe('Tab1Page', () => {
  let component: TabTarjetasPage;
  let fixture: ComponentFixture<TabTarjetasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabTarjetasPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TabTarjetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
