import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ChangeDetectorRef, Component, DebugElement, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { WorkerOnlyDirective } from './worker-only.directive';
import { AuthService } from '../../../..//modules/Auth/services/auth.service';
import { Role } from '@app/interfaces/storage.interface';
import { AuthModule } from '../../../../modules/Auth/auth.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
  
  describe('WorkerOnlyDirective', () => {
    @Component({
      template: `
        <ng-template workerOnly>
          content
        </ng-template>
      `
    })
    class TestComponent {
      @ViewChild(WorkerOnlyDirective, { static: true }) workerDirective!: WorkerOnlyDirective;
      // @ViewChild adminOnly 
      onInitMock(){
        this.workerDirective.ngOnInit();
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
            declarations: [ WorkerOnlyDirective,TestComponent],
            imports: [],
            providers: [
              {
                provide:AuthService, 
                useValue: authServiceMock 
              }
            ],
        })

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
        
    })
  
    it('should show content for worker', (() => {
         // given 
      (authServiceMock.isLoggedIn).mockReturnValue(true);
      const viewContainerSpy = jest.spyOn(component.workerDirective.viewContainerRef, 'createEmbeddedView')

      // when
      component.onInitMock();
      fixture.detectChanges();

      // then
      expect(authServiceMock.isLoggedIn).toHaveBeenCalled();
      expect(viewContainerSpy).toHaveBeenCalled();

      }));
    
      it('should hide content for non-worker', fakeAsync (() => {
        // given 
        const viewContainerSpy = jest.spyOn(component.workerDirective.viewContainerRef, 'clear')
        authServiceMock.isLoggedIn.mockReturnValue(false);

        // when
        component.onInitMock();
        fixture.detectChanges();

        // then
        expect(authServiceMock.isLoggedIn).toHaveBeenCalled();
        expect(viewContainerSpy).toHaveBeenCalled();
      }));
    });