import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import 'hammerjs';

import { AppComponent } from './app.component';
import { DatabaseService } from './services/database.service';
import { GuildService } from './services/guild.service';
import { CharacterService } from './services/character.service';
import { AchievementsService } from './services/achievements.service';
import { RosterComponent } from './components/roster/roster.component';
import { NewsComponent } from './components/guild-feed/news/news.component';
import { AchievementsComponent } from './components/guild-feed/achievements/achievements.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { StreamComponent } from './components/stream/stream.component';
import { StreamItemComponent } from './components/stream-item/stream-item.component';
import { CharacterComponent } from './components/roster/character/character.component';
import { StreamsComponent } from './components/streams/streams.component';
import { CharacterItemComponent } from './components/roster/character/character-item/character-item.component';
import { CharacterProgressComponent } from './components/roster/character/character-progress/character-progress.component';
import { RaidProgressBarComponent } from './components/roster/character/character-progress/raid-progress-bar/raid-progress-bar.component';
import { ArtifactComponent } from './components/roster/character/character-item/artifact/artifact.component';
import { CharacterLogItemComponent } from './components/roster/character/character-log-item/character-log-item.component';
import { LogsComponent } from './components/logs/logs.component';
import { GuildFeedComponent } from './components/guild-feed/guild-feed.component';
import { CharacterAchievementComponent } from './components/roster/character/character-achievement/character-achievement.component';
import { CharacterAchievementListItemComponent } from './components/roster/character/character-achievement-list-item/character-achievement-list-item.component';
import { CharacterItemsComponent } from './components/roster/character/character-items/character-items.component';
import { CharacterLogsComponent } from './components/roster/character/character-logs/character-logs.component';
import { RaidToolComponent } from './components/raid-tool/raid-tool.component';
import { RaiderComponent } from './components/raid-tool/raider/raider.component';
import { AuthenticationService } from './services/authentication.service';
import { StatsComponent } from './components/roster/character/stats/stats.component';
import { CharacterChallengesComponent } from './components/roster/character/character-challenges/character-challenges.component';

@NgModule({
	declarations: [
		AppComponent,
		RosterComponent,
		NewsComponent,
		AchievementsComponent,
		ChallengeComponent,
		NavbarComponent,
		FooterComponent,
		StreamComponent,
		StreamItemComponent,
		CharacterComponent,
		StreamsComponent,
		CharacterItemComponent,
		CharacterProgressComponent,
		RaidProgressBarComponent,
		ArtifactComponent,
		CharacterLogItemComponent,
		LogsComponent,
		GuildFeedComponent,
		CharacterAchievementComponent,
		CharacterAchievementListItemComponent,
		CharacterItemsComponent,
		CharacterLogsComponent,
		RaidToolComponent,
		RaiderComponent,
		StatsComponent,
		CharacterChallengesComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		HttpClientModule,
		MaterialModule,
		RouterModule.forRoot([
			{path: '', component: GuildFeedComponent},
			{path: 'roster', component: RosterComponent},
			{path: 'roster/:realm/:character', component: CharacterComponent},
			{path: 'roster/:realm/:character/:tab', component: CharacterComponent},
			{path: 'roster/:realm/:character/:tab/:category', component: CharacterComponent},
			{path: 'challenges', component: ChallengeComponent},
			{path: 'tools/raid-composition', component: RaidToolComponent},
			{path: 'logs', component: LogsComponent},
			{path: 'streams', component: StreamsComponent},
			{path: '**', component: NewsComponent}
		])
	],
	providers: [
		GuildService,
		CharacterService,
		AchievementsService,
		DatabaseService,
		AuthenticationService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
