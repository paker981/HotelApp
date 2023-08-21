import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { RoomService } from '@app/modules/Rooms/services/room.service';
import { Room, RoomState } from '@app/modules/Rooms/types/room.types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, debounceTime, filter, map, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-rooms-step',
  templateUrl: './rooms-step.component.html',
  styleUrls: ['./rooms-step.component.scss']
})
export class RoomsStepComponent implements OnInit {
  protected form: FormArray = new FormArray([]) as unknown as FormArray<FormControl<Room>>
  protected availableRooms: Observable<Room[]> = 
    this.roomService.data$.pipe(
      map((rooms) => rooms.filter((room) => room.state === RoomState.CLEANED))
    );
                                                                            
  @Output() private formSubmitted: EventEmitter<Room[]> = new EventEmitter<Room[]>();

  constructor(private roomService: RoomService){}

  protected onRoomChange(event: MatCheckboxChange, room: Room): void {
    const selectedRooms = this.form;

    if (event.checked) {
      selectedRooms.push(new FormControl(room) as FormControl<Room>);
    } else {
      const index = selectedRooms.controls.findIndex(control => control.value === room);
      if (index !== -1) {
        selectedRooms.removeAt(index);
      }
    }
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      tap(console.log),
      debounceTime(200),
      untilDestroyed(this)
    ).subscribe((value)=>this.formSubmitted.emit(value))
  }
}
