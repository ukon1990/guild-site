import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuildComponent} from '../components/guild/guild.component';
import {CharacterComponent} from '../components/character/character.component';
import {GuildRosterComponent} from '../components/guild/guild-roster/guild-roster.component';
import {GuildChallengeComponent} from '../components/guild/guild-challenge/guild-challenge.component';
import {GuildNewsComponent} from '../components/guild/guild-news/guild-news.component';
import {CharacterItemsComponent} from '../components/character/character-items/character-items.component';

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
                component: CharacterComponent,
                children: [
                  {path: 'equipment', component: CharacterItemsComponent}
                ]
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
