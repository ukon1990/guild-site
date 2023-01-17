import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FrontPageComponent} from "./components/front-page/front-page.component";
import {TitledRoutes} from "./models/route/titled-routes.model";
import {RouteHiddenFlag} from "./enums";
import {guildRoutes} from "./components/guild/guild.routes";
import {characterRoutes} from "./components/character/character.routes";

export const appRoutes: TitledRoutes = [
  {path: '', component: FrontPageComponent, pathMatch: 'full', isHidden: RouteHiddenFlag.ALWAYS},
  guildRoutes,
  characterRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
