import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuildComponent} from '../components/guild/guild.component';
import {CharacterComponent} from '../components/character/character.component';
import {GuildRosterComponent} from '../components/guild/guild-roster/guild-roster.component';
import {GuildChallengeComponent} from '../components/guild/guild-challenge/guild-challenge.component';
import {GuildNewsComponent} from '../components/guild/guild-news/guild-news.component';
import {CharacterItemsComponent} from '../components/character/character-items/character-items.component';
import {CharacterFeedComponent} from '../components/character/character-feed/character-feed.component';
import {CharacterMountsComponent} from '../components/character/character-mounts/character-mounts.component';
import {CharacterPvpComponent} from '../components/character/character-pvp/character-pvp.component';
import {CharacterPetsComponent} from '../components/character/character-pets/character-pets.component';
import {CharacterAchievementsComponent} from '../components/character/character-achievements/character-achievements.component';
import {CharacterStatisticsComponent} from '../components/character/character-statistics/character-statistics.component';
import {CharacterProgressionComponent} from '../components/character/character-progression/character-progression.component';

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
                  {path: 'feed', component: CharacterFeedComponent},
                  {path: 'equipment', component: CharacterItemsComponent},
                  {path: 'progression', component: CharacterProgressionComponent},
                  {path: 'pvp', component: CharacterPvpComponent},
                  {path: 'mounts', component: CharacterMountsComponent},
                  {path: 'pets', component: CharacterPetsComponent},
                  {path: 'achievements', component: CharacterAchievementsComponent},
                  {path: 'statistics', component: CharacterStatisticsComponent}
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
