import { Role } from "@app/interfaces/storage.interface";
import { adminGuard } from "./admin.guard";
import { TestBed, fakeAsync } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "@app/modules/Auth/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { CustomSnackBarComponent } from "@app/components/custom-snack-bar/custom-snack-bar.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe('adminGuard', () => {

    const snackBarMock = {
      openFromComponent: jest.fn()
    };

    const authServiceMock = {
      isLoggedIn: jest.fn()
    };
  
  
    beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [],
        imports: [NoopAnimationsModule],
        providers: [
          {
            provide: AuthService,
            useValue: authServiceMock
          },
          {
            provide: MatSnackBar,
            useValue: snackBarMock
          }],
          schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
  
    });

  it('should return true when the user is logged in as a admin', fakeAsync (() => {
    // given
    authServiceMock.isLoggedIn.mockReturnValue(true);

    // when
    const resolver = TestBed.runInInjectionContext(() => {
        return adminGuard({}, []);
      });

    // then
    expect(resolver).toBe(true);
    expect(authServiceMock.isLoggedIn).toHaveBeenCalledWith(Role.ADMIN);
    expect(snackBarMock.openFromComponent).not.toHaveBeenCalled();
  }));

  it('should return false and display an error snackbar when the admin is not logged in', () => {
    // given
    authServiceMock.isLoggedIn.mockReturnValue(false);

    // when
    const resolver = TestBed.runInInjectionContext(() => {
        return adminGuard({}, []);
      });

    // then
    expect(resolver).toBe(false);
    expect(authServiceMock.isLoggedIn).toHaveBeenCalledWith(Role.ADMIN);
    expect(snackBarMock.openFromComponent).toHaveBeenCalled();
  });
});

