import {EventEmitter, Injectable} from '@angular/core';
import {Character} from '../models/character';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Endpoints} from '../../../../server/utils/endpoints.util';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  static events: EventEmitter<Character> = new EventEmitter();
  character: Character;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  get(region: string, realm: string, name: string): Promise<Character> {
    return this.http.get(
      new Endpoints().getPath(`character/${
        realm}/${name
      }?fields=achievements,feed,guild,items,mounts,pets,pvp,progression,reputation,talents,audit,statistics`, region))
      .toPromise()
      .then((data: Character) => {
        this.character = data;
        CharacterService.events.emit(data);
        return data;
      }) as Promise<Character>;
  }
}
