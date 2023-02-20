import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FrontPageComponent} from './components/front-page/front-page.component';
import {GuildComponent} from './components/guild/guild.component';
import {CharacterComponent} from './components/character/character.component';
import {HttpClientModule} from "@angular/common/http";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MenuComponent} from "./components/menu/menu.component";
import {MenuDropdownComponent} from "./components/menu/menu-dropdown/menu-dropdown.component";
import {MenuItemComponent} from "./components/menu/menu-item/menu-item.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTabsModule} from "@angular/material/tabs";
import {GuildRosterComponent} from '@components/guild/guild-roster/guild-roster.component';
import {MatListModule} from "@angular/material/list";
import {MatLineModule, MatOptionModule} from "@angular/material/core";
import {GuildAchievementsComponent} from '@components/guild/guild-achievements/guild-achievements.component';
import {GuildActivityComponent} from '@components/guild/guild-activity/guild-activity.component';
import {TableComponent} from "@components/table/table.component";
import {ColumnComponent} from "@components/table/column/column.component";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    GuildComponent,
    CharacterComponent,
    MenuComponent,
    MenuDropdownComponent,
    MenuItemComponent,
    GuildRosterComponent,
    GuildAchievementsComponent,
    GuildActivityComponent,
    TableComponent,
    ColumnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    MatLineModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
