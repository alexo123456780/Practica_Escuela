import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerfilAComponent } from './editar-perfil-a.component';

describe('EditarPerfilAComponent', () => {
  let component: EditarPerfilAComponent;
  let fixture: ComponentFixture<EditarPerfilAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPerfilAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPerfilAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
