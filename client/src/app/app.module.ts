import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CharacterListComponent } from './components/character/character-list/character-list.component';
import { NavComponent } from './components/nav/nav.component';
import {MaterialModule} from './modules/material.module';
import {OAuthModule} from 'angular-oauth2-oidc-codeflow';
import { CharacterCardComponent } from './components/character/character-card/character-card.component';
import { GuildComponent } from './components/guild/guild.component';
import { CharacterComponent } from './components/character/character.component';
import {AuthenticationInterceptor} from './interceptors/auth.interceptor';
import { GuildRosterComponent } from './components/guild/guild-roster/guild-roster.component';
import { GuildNewsComponent } from './components/guild/guild-news/guild-news.component';
import { GuildChallengeComponent } from './components/guild/guild-challenge/guild-challenge.component';
import { GoldPipe } from './pipes/gold.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CharacterListComponent,
    NavComponent,
    CharacterCardComponent,
    GuildComponent,
    CharacterComponent,
    GuildRosterComponent,
    GuildNewsComponent,
    GuildChallengeComponent,
    GoldPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MaterialModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
