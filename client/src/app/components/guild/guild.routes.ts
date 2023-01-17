import {GuildComponent} from "./guild.component";
import {RouteHiddenFlag} from "../../enums";
import {TitledRoute} from "../../models/route/titled-route.model";
import {GuildRosterComponent} from "./guild-roster/guild-roster.component";
import {GuildAchievementsComponent} from "./guild-achievements/guild-achievements.component";
import {GuildActivityComponent} from "./guild-activity/guild-activity.component";

export const guildRoutes: TitledRoute = {
  path: ':region/:realm/guild/:slug',
  component: GuildComponent,
  isHidden: RouteHiddenFlag.ALWAYS,
  children: [
    {path: 'roster', title: 'Roster', component: GuildRosterComponent},
    {path: 'achievements', title: 'Achievements', component: GuildAchievementsComponent},
    {path: 'activities', title: 'Activities', component: GuildActivityComponent},
  ]
};
