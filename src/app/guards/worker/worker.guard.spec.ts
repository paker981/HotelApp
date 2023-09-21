import { Role } from "@app/interfaces/storage.interface";
import { workerdGuard } from "./worker.guard";
import { TestBed, fakeAsync } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "@app/modules/Auth/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { CustomSnackBarComponent } from "@app/components/custom-snack-bar/custom-snack-bar.component";


describe('workerdGuard', () => {

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
    }).compileComponents();

  });

  it('should return true when the user is logged in as a admin', fakeAsync (() => {
    // given
    authServiceMock.isLoggedIn.mockReturnValue(true);

    // when
    const resolver = TestBed.runInInjectionContext(() => {
        return workerdGuard({}, []);
      });

    // then
    expect(resolver).toBe(true);
    expect(authServiceMock.isLoggedIn).toHaveBeenCalledWith(Role.WORKER);
    expect(snackBarMock.openFromComponent).not.toHaveBeenCalled();
  }));

  it('should return false and display an error snackbar when the user is not logged in', () => {
    // given
    authServiceMock.isLoggedIn.mockReturnValue(false);

    // when
    const resolver = TestBed.runInInjectionContext(() => {
        return workerdGuard({}, []);
      });

    // then
    expect(resolver).toBe(false);
    expect(authServiceMock.isLoggedIn).toHaveBeenCalledWith(Role.WORKER);
    expect(snackBarMock.openFromComponent).toHaveBeenCalled();
  });
});



