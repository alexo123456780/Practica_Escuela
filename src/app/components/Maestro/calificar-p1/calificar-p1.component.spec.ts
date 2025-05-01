import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarP1Component } from './calificar-p1.component';

describe('CalificarP1Component', () => {
  let component: CalificarP1Component;
  let fixture: ComponentFixture<CalificarP1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificarP1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificarP1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
