import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from 'src/app/services/login.service';
import { LoginServiceMock } from 'src/app/services/login.service.mock';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [{provide: LoginService, useClass: LoginServiceMock}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('service property #loggedIn should be true when calling #onSubmit', () => {
    let loginService = fixture.debugElement.injector.get(LoginService);
    expect(loginService['loggedIn']).toBe(false);
    component.onSubmit();
    expect(loginService['loggedIn']).toBe(true);
  });
});
