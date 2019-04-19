import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Character} from '../models/character';
import {Guild} from '../models/guild.model';
import {HttpClient} from '@angular/common/http';
import {Endpoints} from '../../../../server/utils/endpoints.util';

@Injectable({
  providedIn: 'root'
})
export class GuildService {
  guild: Guild;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  get(character: Character): Promise<Guild> {
    if (!character.guild) {
      console.error('The character is not in a guild', character);
      return;
    }
    return this.http.get(
      new Endpoints().getPath(`/wow/guild/${
        character.realm
        }/${
        character.guild
        }?fields=members,achievements,news,challenge`))
      .toPromise()
      .then((guild: Guild) =>
        this.guild = guild) as Promise<Guild>;
  }
}
