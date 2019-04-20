import {Component, OnDestroy} from '@angular/core';
import {Guild, GuildCharacter2, Member2} from '../../../models/guild.model';
import {SubscriptionsUtil} from '../../../utils/subscriptions.util';
import {GuildService} from '../../../services/guild.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ColumnDescription} from '../../../models/column-description';

@Component({
  selector: 'app-guild-challenge',
  templateUrl: './guild-challenge.component.html',
  styleUrls: ['./guild-challenge.component.scss']
})
export class GuildChallengeComponent implements OnDestroy {
  guild: Guild;
  subscriptions = new SubscriptionsUtil();
  challengeColumns: ColumnDescription[] = [
    {key: 'name', title: 'Name', dataType: 'string'},
    {key: 'class', title: 'Class', dataType: 'class'},
    {key: 'realm', title: 'Realm', dataType: 'string'},
    {key: 'guild', title: 'Guild', dataType: 'string'},
    {key: 'spec', title: 'Spec', dataType: 'spec'}
  ];

  constructor(private guildService: GuildService, private sanitizer: DomSanitizer) {
    this.guild = this.guildService.guild;
    this.subscriptions.add(
      GuildService.events,
      (guild: Guild) =>
        this.guild = guild
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getCharacters(members: Member2[]): GuildCharacter2[] {
    const list = [];
    members.forEach((member: Member2) => {
      member.character.spec = member.spec;
      list.push(member.character);
    });
    return list;
  }
}
