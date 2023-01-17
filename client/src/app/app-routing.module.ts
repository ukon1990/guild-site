import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FrontPageComponent} from "./components/front-page/front-page.component";
import {GuildComponent} from "./components/guild/guild.component";
import {CharacterComponent} from "./components/character/character.component";
import {TitledRoutes} from "./models/route/titled-routes.model";

export enum RouteHiddenFlag {
  IS_NOT_REGISTERED = 'IS_NOT_REGISTERED',
  IS_REGISTERED = 'IS_REGISTERED',
  ONLY_IN_DEVELOP = 'ONLY_IN_DEVELOP',
  ALWAYS = 'ALWAYS',
  ADMIN_ONLY = 'ADMIN_ONLY',
}

export const appRoutes: TitledRoutes = [
  {path: '', component: FrontPageComponent, pathMatch: 'full', isHidden: RouteHiddenFlag.ALWAYS},
  {path: ':region/:realm/guild/:slug', component: GuildComponent, isHidden: RouteHiddenFlag.ALWAYS},
  {path: ':region/:realm/character/:slug', component: CharacterComponent, isHidden: RouteHiddenFlag.ALWAYS},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
