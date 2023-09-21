import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomsStepComponent } from './rooms-step.component';
import { ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { of } from 'rxjs';
import { RoomService } from '@app/modules/shared/Rooms/services/room.service';
import { Room, RoomState } from '@app/modules/shared/Rooms/types/room.types';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RoomsStepComponent', () => {

  class RoomsStepComponentMock extends RoomsStepComponent {
    onRoomChangeMock(event: MatCheckboxChange, room: Room){
      this.onRoomChange(event,room);
    }
  }

  const roomServiceMock = {
    data$: of([
      { number: 1, state: RoomState.CLEANED, pricePerDay: 300 },
      { number: 2, state: RoomState.RESERVED, pricePerDay: 400 }
    ])
  }

  let component: RoomsStepComponentMock;
  let fixture: ComponentFixture<RoomsStepComponentMock>;

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      declarations: [
        RoomsStepComponent,
        RoomsStepComponentMock
      ],
      imports: [ReactiveFormsModule],
      providers: [
        { 
          provide: RoomService, 
          useValue: roomServiceMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(RoomsStepComponentMock);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.form = new FormArray([]) as unknown as FormArray<FormControl<Room>>;
  })

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle room change', () => {
    // given
    const room: Room = { number: 1, state: RoomState.CLEANED, pricePerDay: 300 };
    const event: MatCheckboxChange = { checked: true } as MatCheckboxChange;

    // when
    component.onRoomChangeMock(event, room);

    // then
    expect(component.form.length).toBe(1);
    expect(component.form.value[0]).toBe(room);
  });

  it('should remove room from form', () => {
    // given 
    const room: Room = { number: 1, state: RoomState.CLEANED, pricePerDay: 300 };
    const event: MatCheckboxChange = { checked: false } as MatCheckboxChange;
    component.form.push(new FormControl(room) as FormControl<Room>);

    // when
    component.onRoomChangeMock(event, room);

    // then
    expect(component.form.length).toBe(0);
  });

  it('should not remove room if it is not in the form when unchecked', () => {
    // given
    const event: MatCheckboxChange = { checked: false } as MatCheckboxChange;
    const roomInForm = { number: 1, state: RoomState.CLEANED, pricePerDay: 300 }
    const roomNotInForm = { number: 2, state: RoomState.RESERVED, pricePerDay: 400 };
    component.form.push(new FormControl( roomInForm ) as FormControl<Room>);

    // when
    component.onRoomChangeMock(event, roomNotInForm);

    // then
    expect(component.form.controls.length).toBe(1);
    expect(component.form.value[0]).toBe(roomInForm);
  });
});