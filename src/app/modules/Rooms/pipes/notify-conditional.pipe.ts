import { Pipe, PipeTransform } from '@angular/core';
import { RoomState } from '../types/room.types';

@Pipe({
  name: 'notifyConditional'
})
export class NotifyConditionalPipe implements PipeTransform {

  transform(roomState: string, role: string): boolean {
    return roomState === RoomState.DIRTY && role === 'worker';
  }

}
