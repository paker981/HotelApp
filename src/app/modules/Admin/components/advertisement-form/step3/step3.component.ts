import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AdvertisementForm } from '../../../types/advertisement';
import { FormControl, FormGroup } from '@angular/forms';
import { RoomService } from 'src/app/modules/Rooms/services/room.service';
import { Room, RoomState } from 'src/app/modules/Rooms/types/room.types';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step3Component implements OnInit {
  protected availableRooms: Room[] = this.roomService.getRooms().filter((room) => room.state === RoomState.CLEANED);

  @Input({required: true}) form!: FormGroup<AdvertisementForm>;

  constructor(private roomService: RoomService){}

  ngOnInit(): void {
  }

  protected onRoomChange(event: MatCheckboxChange, room: Room): void {
    const selectedRooms = this.form.controls.selectedRooms;

    if (event.checked) {
      selectedRooms.push(new FormControl(room) as FormControl<Room>);
    } else {
      const index = selectedRooms.controls.findIndex(control => control.value === room);
      if (index !== -1) {
        selectedRooms.removeAt(index);
      }
    }
  }

}
