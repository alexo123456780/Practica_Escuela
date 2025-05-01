import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCursoComponent } from './info-curso.component';

describe('InfoCursoComponent', () => {
  let component: InfoCursoComponent;
  let fixture: ComponentFixture<InfoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
