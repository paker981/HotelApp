import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RoomsModule } from "../Rooms/rooms.module";
import { RoomListComponent } from "./components/room-list/room-list.component";
import { ViewRoomComponent } from "./components/view-room/view-room.component";
import { roomDataResolver } from "./resolver/room-data.resolver";

const routes: Routes = [
    {
      path: '',
      redirectTo: 'rooms',
      pathMatch: 'full'
    },
    {
      path: 'rooms',
      component: RoomListComponent
    },
    {
      path: 'room/:id',
      component: ViewRoomComponent,
      resolve: {room: roomDataResolver}
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RoomsRoutingModule {}