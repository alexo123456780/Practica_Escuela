import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAlumnosComponent } from './ver-alumnos.component';

describe('VerAlumnosComponent', () => {
  let component: VerAlumnosComponent;
  let fixture: ComponentFixture<VerAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerAlumnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
