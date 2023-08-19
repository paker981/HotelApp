import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { MaterialModule } from '../Material/material.module';
import { NotifyConditionalPipe } from './pipes/notify-conditional.pipe';
import { RoomComponent } from './components/room/room.component';
import { ViewRoomComponent } from './components/view-room/view-room.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RoomListComponent,
    NotifyConditionalPipe,
    RoomComponent,
    ViewRoomComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MaterialModule,
    ReactiveFormsModule

  ]
})
export class RoomsModule { }
