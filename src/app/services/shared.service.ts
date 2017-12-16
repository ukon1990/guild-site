import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Character } from '../models/character';
import { Guild } from '../services/guild';

@Injectable()
export class SharedService {
	guild: Guild;
	characters: Map<string, Character> = new Map<string, Character>();
}
