import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMaestroComponent } from './login-maestro.component';

describe('LoginMaestroComponent', () => {
  let component: LoginMaestroComponent;
  let fixture: ComponentFixture<LoginMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginMaestroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
