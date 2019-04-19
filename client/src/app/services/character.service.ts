import {Injectable} from '@angular/core';
import {Character} from '../models/character';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getCharacters(): Promise<Character[]> {
    const region = 'eu';
    return this.http.get(
      `https://${
        region
        }.api.blizzard.com/wow/user/characters?access_token=${
        this.authService.getAccessToken()
        }`
    )
      .toPromise() as Promise<Character[]>;
  }
}
