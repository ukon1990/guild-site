import {BlizzardService} from "@libs/services/blizzard.service";

export class GuildService extends BlizzardService<any> {
  constructor(region: string) {
    super(
      region,
      'guild'
    );
  }

  getGuild(realm: string, guild: string) {
    return new Promise<any>(async (resolve, reject) => {
      console.log('CHECKING')
      return this.get(`${realm}/${guild}`)
        .then(resolve)
        .catch(reject);
    });
  }
}
