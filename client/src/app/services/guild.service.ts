import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Guild} from "../models/guild.model";

@Injectable({
  providedIn: 'root'
})
export class GuildService extends BaseService<Guild> {
  constructor(http: HttpClient) {
    super('guild', http);
  }

  getItemPath(region: string, realm: string, guild: string): string {
    return `${region}/${realm}/${guild}`;
  }

  /**
   *
   * @param region the guilds region
   * @param realm slug version of the realm name
   * @param guild Slug version of the guild name
   * @param force
   */
  public getGuild(region: string, realm: string, guild: string, force = false): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const path = this.getItemPath(region, realm, guild);
      if (this.data.value.has(path) && !force) {
        resolve(this.data.value.get(path));
      }
      firstValueFrom(this.get(path)).then(resolve).catch(reject);
    });
  }
}
