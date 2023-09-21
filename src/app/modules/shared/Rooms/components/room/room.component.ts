import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Room } from '../../types/room.types';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomComponent {
  @Input({required: true}) data!: Room;

  constructor(private cd: ChangeDetectorRef){}

  triggerChange(){
    // detectChanges vs markForCheck
    this.cd.detectChanges();
  }

  // metoda() {
  //   // detach
  //   // interval(10) 
  //   // zmienia wartość counter++ 
  //   // if counter === 10000 to chcesz wyświetlić więc wtedy:  detectChanges()
  // }
}
