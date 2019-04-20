import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GuildComponent} from '../components/guild/guild.component';
import {CharacterComponent} from '../components/character/character.component';
import {GuildRosterComponent} from '../components/guild/guild-roster/guild-roster.component';
import {GuildChallengeComponent} from '../components/guild/guild-challenge/guild-challenge.component';
import {GuildNewsComponent} from '../components/guild/guild-news/guild-news.component';

const routes: Routes = [
  {
    path: ':region',
    children: [
      {
        path: ':realm',
        children: [
          {
            path: ':name',
            children: [
              {
                path: 'guild',
                component: GuildComponent,
                children: [
                  {path: '', component: GuildNewsComponent},
                  {path: 'news', component: GuildNewsComponent},
                  {path: 'roster', component: GuildRosterComponent},
                  {path: 'challenges', component: GuildChallengeComponent}
                ]
              }, {
                path: 'character',
                component: CharacterComponent
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
