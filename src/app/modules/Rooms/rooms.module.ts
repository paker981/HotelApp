import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { MaterialModule } from '../Material/material.module';
import { RoomComponent } from './components/room/room.component';
import { ViewRoomComponent } from './components/view-room/view-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RoomListComponent,
    RoomComponent,
    ViewRoomComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule

  ]
})
export class RoomsModule { }
