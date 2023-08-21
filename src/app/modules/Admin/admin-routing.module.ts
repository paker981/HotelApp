import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RoomsModule } from "../Rooms/rooms.module";
import { AdvertisementContainerComponent } from "./components/advertisement-form/advertisement-container.component";


const routes: Routes = [
    {
      path: '',
      component: AdvertisementContainerComponent
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule {}