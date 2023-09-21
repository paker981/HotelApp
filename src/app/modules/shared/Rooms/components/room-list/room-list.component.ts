import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Room, RoomState } from '../../types/room.types';
import { Role } from 'src/app/interfaces/storage.interface';
import { ActivatedRoute } from '@angular/router';
import { CustomSnackBarComponent } from '../../../../../components/custom-snack-bar/custom-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { RoomComponent } from '../room/room.component';



@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent{
  @ViewChildren(RoomComponent) private _roomComponents!: QueryList<RoomComponent>
  protected data$: Observable<Room[]> = this.roomService.data$
  protected states = RoomState;

  constructor(
     private roomService: RoomService, 
     private snackBar: MatSnackBar
  ){}

  get roomComponents(): QueryList<RoomComponent> {
    return this._roomComponents;
  }

  protected onNotifyAdmin(roomNumber: number){
    CustomSnackBarComponent.openSuccessSnackBar(this.snackBar,'Admin was notified!', 'Close');
    this.roomService.updateRoomStatus(roomNumber, RoomState.TO_CHECK);
    this._roomComponents.forEach((component)=>{
      component.triggerChange();
    })
  }

  protected trackById(index: number, room: Room){
    return room.number;
  }
}
