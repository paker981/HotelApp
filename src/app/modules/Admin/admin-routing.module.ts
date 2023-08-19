import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RoomsModule } from "../Rooms/rooms.module";
import { AdvertisementFormComponent } from "./components/advertisement-form/advertisement-form.component";

const routes: Routes = [
    {
      path: '',
      component: AdvertisementFormComponent
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule {}