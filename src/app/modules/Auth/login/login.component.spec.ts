import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Role } from '@app/interfaces/storage.interface';
import { CustomSnackBarComponent } from '@app/components/custom-snack-bar/custom-snack-bar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Route } from '@mui/icons-material';
import { NO_ERRORS_SCHEMA } from '@angular/core';



describe('LoginComponent', () => {

  class LoginComponentMock extends LoginComponent { //mocked na koncu

    loginMock(): void {
      super.login();
    }

    setFormValue(value: string) {
      this.form.setValue(value);
    }
  }

  const authServiceMock = {
    log: jest.fn()
  }

  const routerMock = {
    navigate: jest.fn()
  }

  const matSnackBarMock = {
    openFromComponent: jest.fn()
  }

  let component: LoginComponentMock;
  let fixture: ComponentFixture<LoginComponentMock>;

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        LoginComponentMock
      ],
      imports: [NoopAnimationsModule],
      providers: [
        {
            provide: AuthService,
            useValue: authServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: MatSnackBar,
          useValue: matSnackBarMock
        }],
        schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponentMock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should log and redirect when login is successful', () => {
    // given
    const correctLogin = 'worker';
    const correctPath = ['dashboard'];

    // when
    component.setFormValue(correctLogin);
    component.loginMock();

    // then
    expect(authServiceMock.log).toHaveBeenCalledWith(Role.WORKER);
    expect(routerMock.navigate).toHaveBeenCalledWith(correctPath);
    expect(matSnackBarMock.openFromComponent).toHaveBeenCalled();
  });

  it('should show error snackbar when login fails', () => {
    // given
    const incorrectLogin = '123';

    // when
    component.setFormValue(incorrectLogin);
    component.loginMock();

    // then
    expect(authServiceMock.log).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
    expect(matSnackBarMock.openFromComponent).toHaveBeenCalled();
  });
});