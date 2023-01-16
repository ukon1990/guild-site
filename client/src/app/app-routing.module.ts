import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FrontPageComponent} from "./components/front-page/front-page.component";
import {GuildComponent} from "./components/guild/guild.component";
import {CharacterComponent} from "./components/character/character.component";

const routes: Routes = [
  {path: '', component: FrontPageComponent, pathMatch: 'full'},
  {path: ':region/:realm/guild/:slug', component: GuildComponent},
  {path: ':region/:realm/character/:slug', component: CharacterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
