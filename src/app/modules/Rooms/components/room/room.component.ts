import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Room } from '../../types/room.types';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomComponent {
  @Input({required: true}) data!: Room;
}
