import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMaestroComponent } from './dashboard-maestro.component';

describe('DashboardMaestroComponent', () => {
  let component: DashboardMaestroComponent;
  let fixture: ComponentFixture<DashboardMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMaestroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
