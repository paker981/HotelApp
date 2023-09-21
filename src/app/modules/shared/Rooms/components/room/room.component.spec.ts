import { ComponentFixture, TestBed, getTestBed } from "@angular/core/testing";
import { Room, RoomState } from "../../types/room.types";
import { RoomComponent } from "./room.component";
import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { By } from "@angular/platform-browser";
import { CdkAriaLive } from "@angular/cdk/a11y";
import { MaterialModule } from "@app/modules/Material/material.module";

  describe('RoomComponent', () => {
    let fixture: ComponentFixture<RoomComponent>;
    let roomComponent: RoomComponent;

    const changeDetectorRefMock: ChangeDetectorRef = {
      detectChanges: jest.fn(),
      markForCheck: jest.fn(),
      detach: jest.fn(),
      checkNoChanges: jest.fn(),
      reattach: jest.fn()
    }
  
    beforeEach(() => {
      jest.clearAllMocks();
        TestBed.configureTestingModule({
          declarations: [
            RoomComponent
          ],
          imports: [
            MaterialModule
          ],
          providers: [
            {
              provide: ChangeDetectorRef,
              useValue: changeDetectorRefMock
            }
          ]
        }).overrideComponent(RoomComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
          

        }).compileComponents();

      fixture = TestBed.createComponent(RoomComponent);
      roomComponent = fixture.componentInstance;
      roomComponent.data = { number: 1, state: RoomState.CLEANED, pricePerDay: 100 };
    });
  
     it('should create', () => {
      expect(roomComponent).toBeTruthy();
    });
  
    it('should trigger change detection',  async () => {
        // So, I am spying directly on the prototype.
        const component = new RoomComponent(changeDetectorRefMock);
       // fixture.detectChanges();

        // when
        component.triggerChange();
      
        // then
        expect(changeDetectorRefMock.detectChanges).toHaveBeenCalled();
      });
});