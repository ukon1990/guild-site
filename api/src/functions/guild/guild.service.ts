import {BlizzardService} from "@libs/services/blizzard.service";
import {Guild} from "@libs/models/guild.model";
import {cleanGuildData} from "@libs/util/clean-data.util";

export class GuildService extends BlizzardService<Guild.Guild> {
  constructor(region: string) {
    super(
      region,
      'data',
      'guild'
    );
  }

  getGuild(realm: string, guild: string) {
    return new Promise<Guild.Guild>(async (resolve, reject) => {
      this.get(`${realm}/${guild}`)
        .then(async result => {
          if (result) {
            if (result.roster) {
              await this.get(`${realm}/${guild}/roster`)
                .then(({members}: any) => {
                  result.roster = {members};
                })
                .catch(console.error);
            }
            if (result.achievements) {
              await this.get(`${realm}/${guild}/achievements`)
                .then(({
                         total_quantity,
                         total_points,
                         achievements,
                         category_progress,
                         recent_events
                       }: any) => {
                  result.achievements = {
                    total_quantity,
                    total_points,
                    achievements,
                    category_progress,
                    recent_events
                  };
                })
                .catch(console.error);
            }
            if (result.activity) {
              await this.get(`${realm}/${guild}/activity`)
                .then(({activities}) => {
                  delete result.activity;
                  result.activities = activities;
                })
                .catch(console.error);
            }
          }
          resolve(cleanGuildData(result));
        })
        .catch(reject)
    });
  }
}
