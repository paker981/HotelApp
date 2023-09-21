import { Component, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Role } from "@app/interfaces/storage.interface";
import { AuthService } from "@app/modules/Auth/services/auth.service";
import { AdminOnlyDirective } from "./admin-only.directive";
import { By } from "@angular/platform-browser";

// Mock AuthService


  
describe('adminOnlyDirective', () => {
  @Component({
    template: `
      <ng-template adminOnly>
        content
      </ng-template>
    `
  })
  class TestComponent {
    @ViewChild(AdminOnlyDirective, { static: true }) adminDirective!: AdminOnlyDirective;
    // @ViewChild adminOnly 
    onInitMock(){
      this.adminDirective.ngOnInit();
     }
  }

  const templateRefMock = {
    createEmbeddedView: jest.fn()
  };


  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  const authServiceMock = {
    isLoggedIn: jest.fn()
  }

  beforeEach(() => {
      TestBed.configureTestingModule({
          declarations: [
            AdminOnlyDirective,
            TestComponent
        ],
          imports: [],
          providers: [
            { 
              provide: AuthService,
              useValue: authServiceMock // {isLoggedIn: jest.fn()}
            },
            {
              provide: TemplateRef,
              useValue: templateRefMock
            },
            {
              provide: ViewContainerRef,
              useValue: templateRefMock
            }
          ],
      })
      
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
  })

  it('should show content for worker', (() => {
      // given 
      authServiceMock.isLoggedIn.mockReturnValue(true);
      const createEmbeddedViewSpy = jest.spyOn(component.adminDirective.viewContainerRef, 'createEmbeddedView');
      // when
      component.onInitMock();

      // then
      expect(authServiceMock.isLoggedIn).toHaveBeenCalled();
      expect(createEmbeddedViewSpy).toHaveBeenCalled();


      //expect(fixture.nativeElement.innerHTML).toContain('content'); nie unit a integracyjne

    }));


  it('should hide content for non-worker',  (() => {
    // given 
    const viewContainerSpy = jest.spyOn(component.adminDirective.viewContainerRef, 'clear')
    const authServiceSpy = jest.spyOn(authServiceMock, 'isLoggedIn').mockReturnValue(false);

    // when
    component.onInitMock();

    // then
    expect(authServiceSpy).toHaveBeenCalled();
    expect(viewContainerSpy).toHaveBeenCalled();
    }));


});