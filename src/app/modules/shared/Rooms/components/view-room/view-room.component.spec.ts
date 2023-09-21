import { MatSnackBar } from "@angular/material/snack-bar";
import { RoomService } from "../../services/room.service";
import { ViewRoomComponent } from "./view-room.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from "@angular/router";
import { CommonModule, Location } from '@angular/common';
import { RoomState } from "../../types/room.types";
import { RoomComponent } from "../room/room.component";
import { CustomSnackBarComponent } from "@app/components/custom-snack-bar/custom-snack-bar.component";
import { MaterialModule } from "@app/modules/Material/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe('ViewRoomComponent', () => {
  class ViewRoomComponentMock extends ViewRoomComponent { //mocked na koncu

    onEditMock(roomNumber: number): void {
      super.onEdit(roomNumber);
    }

    setFormValue(value: RoomState) {
      this.form.setValue(value);
    }
  }
  let component: ViewRoomComponentMock;
  let fixture: ComponentFixture<ViewRoomComponentMock>;

  const matSnackBarMock = {
    openFromComponent: jest.fn()
  };

  const locationMock = {
    back: jest.fn()
  };

  const roomServiceMock = {
    updateRoomStatus: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      declarations: [
        ViewRoomComponent,
        ViewRoomComponentMock,
        RoomComponent
      ],
      imports: [
        MaterialModule,
        NoopAnimationsModule
      ],
      providers: [
          // StubClass -- nie robimy tak!!
          {
            provide: MatSnackBar,
            useValue: matSnackBarMock
          },
          {
            provide: Location,
            useValue: locationMock
          },
          {
            provide: RoomService,
            useValue: roomServiceMock
          },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                data: {
                  room: {} // Dostarcz dane, które będą dostępne przez route.snapshot.data['room']
                }
              }
            }
          }
        ]
      });

    fixture = TestBed.createComponent(ViewRoomComponentMock);
    component = fixture.componentInstance;
    // roomServiceSpy = TestBed.inject(RoomService); // do wyjeabnia + zamockuj
    // location = TestBed.inject(Location); // do wyjeabnia + zamockuj
    // activatedRoute = TestBed.inject(ActivatedRoute); // do wyjeabnia + zamockuj
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle room editing with invalid form', async () => {
    // given
    const roomNumber = 1;
    // set invalid form
    component.setFormValue('' as unknown as RoomState);
  

    // when
    component.onEditMock(roomNumber);  //dziedziczenie metody ?? - good way?
  
    // then
    expect(matSnackBarMock.openFromComponent).toHaveBeenCalled(); //mozna dorzucic parametry, ale testowanie ze stringami wiadomo, ze ciezka sprawa
    expect(locationMock.back).not.toHaveBeenCalled(); // jeden rabin tak drugi wiadomo
    expect(roomServiceMock.updateRoomStatus).not.toHaveBeenCalled(); // jeden rabin tak drugi wiadomo
  });

  it('should handle room editing with valid form', () => {
    // given
    const roomNumber = 2;
    const newState = RoomState.TO_CHECK;
    // Ustawiamy stan formularza na poprawny
    // webstorm + code coverage - 70-80%

    // when
    // set valid form
    component.setFormValue(newState);
    component.onEditMock(roomNumber);

    // then
    expect(matSnackBarMock.openFromComponent).toHaveBeenCalled();
    expect(locationMock.back).toHaveBeenCalled(); // Powinno być odwołanie do location.back
    expect(roomServiceMock.updateRoomStatus).toHaveBeenCalledWith(roomNumber, newState); // Powinno być odwołanie do roomService
  });
});