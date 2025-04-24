import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteDashboardComponent } from './estudiante-dashboard.component';

describe('EstudianteDashboardComponent', () => {
  let component: EstudianteDashboardComponent;
  let fixture: ComponentFixture<EstudianteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudianteDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudianteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
