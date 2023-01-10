import {EventEmitter, Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Endpoints} from '../../../../server/utils/endpoints.util';
import {Guild, Member} from '../models/guild.model';
import {Character} from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class GuildService {
  static events: EventEmitter<Guild> = new EventEmitter();
  guild: Guild;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  get(region: string, realm: string, name: string): Promise<Guild> {
    return this.http.get(
      new Endpoints().getPath(`guild/${
          realm
          }/${
          name
          }?fields=members,achievements,news,challenge`,
        region))
      .toPromise()
      .then((guild: Guild) => {
        this.sortMembers(guild.members);
        this.guild = guild;
        GuildService.events.emit(guild);
        return guild;
      }) as Promise<Guild>;
  }

  private sortMembers(members: Member[]) {
    members.sort(
      (a: Member, b: Member) => {
        a.character.rank = a.rank;
        const levelDiff = b.character.level - a.character.level;
        if (levelDiff !== 0) {
          return levelDiff;
        }
        const rankDiff = a.rank - b.rank;
        if (rankDiff !== 0) {
          return rankDiff;
        }
        return b.character.achievementPoints - a.character.achievementPoints;
      });
  }
}
