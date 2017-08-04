import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import 'hammerjs';
import { AppComponent } from './app.component';
import { GuildService } from './services/guild.service';
import { CharacterService } from './services/character.service';
import { RosterComponent } from './components/roster/roster.component';
import { NewsComponent } from './components/news/news.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
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
		ArtifactComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		MaterialModule,
		RouterModule.forRoot([
			{path: '', component: NewsComponent},
			{path: 'roster', component: RosterComponent},
			{path: 'roster/:realm/:character', component: CharacterComponent},
			{path: 'achievements', component: AchievementsComponent},
			{path: 'challenges', component: ChallengeComponent},
			{path: 'streams', component: StreamsComponent},
			{path: '**', component: NewsComponent}
		])
	],
	providers: [
		GuildService,
		CharacterService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
