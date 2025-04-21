import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMaestroComponent } from './registro-maestro.component';

describe('RegistroMaestroComponent', () => {
  let component: RegistroMaestroComponent;
  let fixture: ComponentFixture<RegistroMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroMaestroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
