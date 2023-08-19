import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RoomsModule } from "../Rooms/rooms.module";
import { adminGuard } from "src/app/guards/admin/admin.guard";

const routes: Routes = [
  // containerComponent -> nawigacje / powiadomienia itp. / top menu
    {
      path: '',
      loadChildren: () => import("../Rooms/rooms.module").then(m => m.RoomsModule), 
    },
    {
      path: 'advertisement',
      loadChildren: () => import("../Admin/admin.module").then(m => m.AdminModule), 
      canMatch: [adminGuard]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule {}


  // dashboard/user user-before-verification
  // dashboard/admin/advertisement

  // dashboard => dashboard stand. usera
  // dashboard/rooms => rooms module
  // dashboard/clients => clients module
  // dashboard-admin => dashboard admina admin/super-admin
  // dashboard-admin/advertisement => dashboard admina admin/super-admin