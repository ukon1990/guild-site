import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Endpoints} from "../../../../server/utils/endpoints.util";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCharacters() {
    this.http.get(new Endpoints().getPath('user/characters', 'eu'));
  }

  getProfiles() {
    this.http.get(new Endpoints().getPath('user/profile', 'eu'));
  }
}
