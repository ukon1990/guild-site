import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GuildComponent} from '../components/guild/guild.component';

const routes: Routes = [
  {
    path: ':region',
    children: [
      {
        path: ':realm',
        children: [
          {
            path: 'guild',
            children: [
              {
                path: ':name',
                component: GuildComponent
              }
            ]
          },
          {
            path: 'character',
            children: [
              {
                path: ':name',
                component: GuildComponent
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
