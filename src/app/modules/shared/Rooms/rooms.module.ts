import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { MaterialModule } from '../..//Material/material.module';
import { RoomComponent } from './components/room/room.component';
import { ViewRoomComponent } from './components/view-room/view-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


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

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoomsModule { }
