import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "@app/modules/Auth/services/auth.service";
import { ContainerComponent } from "./container.component";
import { NO_ERRORS_SCHEMA } from "@angular/compiler";

describe('ContainerWorkerComponent', () => {
    const authServiceMock = {
      logOut: jest.fn()
    }
  
    let component: ContainerComponent;
    let fixture: ComponentFixture<ContainerComponent>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ContainerComponent],
        imports: [MatToolbarModule, RouterTestingModule],
        providers: [
          { 
              provide:AuthService,
              useValue: authServiceMock
          },
        ],
        schemas: [NO_ERRORS_SCHEMA]
      })
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(ContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  
    it('should logout after call onLogout', () => {
      // when
      component.onLogout();
  
      // then
      expect(authServiceMock.logOut).toHaveBeenCalled();
    })
  });