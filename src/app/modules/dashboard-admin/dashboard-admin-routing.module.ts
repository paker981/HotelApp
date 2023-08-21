import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RoomsModule } from "../Rooms/rooms.module";
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
          pathMatch: 'full'
        },
        {
            path: 'rooms',
            loadChildren: () => import("../Rooms/rooms.module").then(m => m.RoomsModule), 
        },
        {
            path: 'advertisement',
            loadChildren: () => import("../Admin/admin.module").then(m => m.AdminModule), 
        }
      ]
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardAdminRoutingModule {}