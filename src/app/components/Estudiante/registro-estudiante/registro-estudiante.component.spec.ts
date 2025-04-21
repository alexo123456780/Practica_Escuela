import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEstudianteComponent } from './registro-estudiante.component';

describe('RegistroEstudianteComponent', () => {
  let component: RegistroEstudianteComponent;
  let fixture: ComponentFixture<RegistroEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
