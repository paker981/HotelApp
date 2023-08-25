import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RoomsModule } from "../shared/Rooms/rooms.module";
import { adminGuard } from "src/app/guards/admin/admin.guard";
import { ContainerComponent } from "./components/container/container.component";


const routes: Routes = [
  // containerComponent -> nawigacje / powiadomienia itp. / top menu
    {
      path: '',
      component: ContainerComponent,
      children: [
        {
          path: '',
          redirectTo: 'rooms',
          pathMatch: 'full',
        },
        {
            path: 'rooms',
            loadChildren: () => import("../shared/Rooms/rooms.module").then(m => m.RoomsModule),  // można dać do shared-module folder
        },
        {
            path: 'advertisement',
            loadChildren: () => import("../Advertisement/advertisement.module").then(m => m.AdvertisementModule),  // można dać do dashboard-admin folder
        }
      ]
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardAdminRoutingModule {}