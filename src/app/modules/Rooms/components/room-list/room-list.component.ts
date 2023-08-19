import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Room, RoomState } from '../../types/room.types';
import { Role } from 'src/app/interfaces/storage.interface';
import { ActivatedRoute } from '@angular/router';
import { CustomSnackBarComponent } from 'src/app/components/custom-snack-bar/custom-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit{
  protected data: Room[] = this.roomService.getRooms()
  protected state = RoomState;
  protected role!: string;

  constructor(
    private roomService: RoomService,
     private route: ActivatedRoute, 
     private snackBar: MatSnackBar
     ){}

  ngOnInit(): void {
    this.role = this.route.snapshot.params['role'];
  }

  protected onNotifyAdmin(roomNumber: number){
    CustomSnackBarComponent.openSuccessSnackBar(this.snackBar,'Admin was notified!', 'Close');
    this.roomService.updateRoomStatus(roomNumber, RoomState.TOCHECK);
  }

  protected trackById(index: number, room: Room){
    return room.number;
  }

}
