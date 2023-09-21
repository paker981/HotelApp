import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { RoomListComponent } from "./room-list.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { RoomService } from "../../services/room.service";
import { RoomComponent } from "../room/room.component";
import { Room, RoomState } from "../../types/room.types";
import { Observable, of } from "rxjs";
import { Component, Inject, QueryList, inject } from "@angular/core";
import { ChangeDetectorRef } from '@angular/core';
import { CustomSnackBarComponent } from "@app/components/custom-snack-bar/custom-snack-bar.component";
import { MaterialModule } from "@app/modules/Material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe('RoomListComponent', () => {

  const roomsMockup: Room[] = [
    { number: 1, state: RoomState.CLEANED, pricePerDay: 100 },
    { number: 2, state: RoomState.TO_CHECK, pricePerDay: 150 },
  ];


  @Component({
    template: `
      <ng-container *ngIf="data$ | async as rooms">
        <app-room [data]="rooms[0]"></app-room>
        <app-room [data]="rooms[1]"></app-room>
      </ng-container>
    `
  })
  class RoomListComponentMock extends RoomListComponent {
    onNotifyAdminMock(roomNumber: number): void {
        super.onNotifyAdmin(roomNumber);
    }

    trackByIdMock(index: number, room: Room) {
     return super.trackById(index,room);
    }
  }

    const matSnackBarMock = {
      openFromComponent: jest.fn(),
    };

    const changeDetectorRefMock: ChangeDetectorRef = {
      detectChanges: jest.fn(),
      markForCheck: jest.fn(),
      detach: jest.fn(),
      checkNoChanges: jest.fn(),
      reattach: jest.fn()
    };
  
    const roomServiceMock = {
      updateRoomStatus: jest.fn(),
      data$: of(roomsMockup),
    };

    let component: RoomListComponentMock;
    let fixture: ComponentFixture<RoomListComponentMock>;

  
    beforeEach(() =>  {
      jest.clearAllMocks();
      TestBed.configureTestingModule(
        {
          declarations: [
            RoomListComponent,
            RoomListComponentMock,
            RoomComponent
          ],
          providers: [
            {
              provide: MatSnackBar,
              useValue: matSnackBarMock
            },
            {
              provide: RoomService,
              useValue: roomServiceMock
            },
            {
              provide: ChangeDetectorRef,
              useValue: changeDetectorRefMock
            }
          ]
      });

      fixture = TestBed.createComponent(RoomListComponentMock);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    // TODO: przeczytaj o fakeAsync + tick
    // rxjs + delay(1000)
    // TODO: opcjonalne => dodać codecoverage 
    // extensions: ['chrominium-headless']
    // konfig jest'a : extenstions: ['coverage/lcov-report']
    it('should notify admin and update room status', fakeAsync(() => {
      // given
      const roomNumber = 1;
      const [roomComponent1, roomComponent2] = component.roomComponents;
      //tick();
  
      const triggerChangeSpy1 = jest.spyOn(roomComponent1, 'triggerChange');
      const triggerChangeSpy2 = jest.spyOn(roomComponent2, 'triggerChange');
    
      // when
      component.onNotifyAdminMock(roomNumber);
    
      // then
      expect(matSnackBarMock.openFromComponent).toHaveBeenCalled();
      expect(roomServiceMock.updateRoomStatus).toHaveBeenCalledWith(roomNumber, RoomState.TO_CHECK);
      expect(triggerChangeSpy1).toHaveBeenCalled();
      expect(triggerChangeSpy2).toHaveBeenCalled();
    }));
  
    it('should return the room number', () => {
        // given
        const index = 0;
        const room: Room = { number: 1, state: RoomState.CLEANED, pricePerDay: 100 };
  
        // when
        const result = component.trackByIdMock(index, room);
  
        // then
        expect(result).toBe(room.number);
      });
  });