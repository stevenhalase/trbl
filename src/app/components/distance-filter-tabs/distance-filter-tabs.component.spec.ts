import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceFilterTabsComponent } from './distance-filter-tabs.component';

describe('DistanceFilterTabsComponent', () => {
  let component: DistanceFilterTabsComponent;
  let fixture: ComponentFixture<DistanceFilterTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistanceFilterTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanceFilterTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
