import {EventEmitter, Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Endpoints} from '../../../../server/utils/endpoints.util';
import {Guild} from '../models/guild.model';

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
        this.guild = guild;
        GuildService.events.emit(guild);
        return guild;
      }) as Promise<Guild>;
  }
}
