import {Injectable} from '@angular/core';
import {Character} from '../models/character';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Endpoints} from '../../../../server/utils/endpoints.util';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getCharacters(): Promise<Character[]> {
    const region = 'eu';
    return this.http.get(
      new Endpoints().getPath('user/characters', region))
      .toPromise()
      .then((data: any) =>
        data.characters) as Promise<Character[]>;
  }
}
