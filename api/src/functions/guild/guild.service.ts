import {BlizzardService} from "@libs/services/blizzard.service";
import {Guild} from "@libs/models/guild.model";
import {cleanGuildData} from "@libs/util/clean-data.util";

export class GuildService extends BlizzardService<Guild.Guild> {
  constructor(region: string) {
    super(
      region,
      'data',
      'guild',
      'profile'
    );
  }

  getGuild(realm: string, guild: string) {
    return new Promise<Guild.Guild>(async (resolve, reject) => {
      this.get(`${realm}/${guild}`)
        .then(async result => {
          if (result) {
            const promises: Promise<void>[] = [];
            if (result.roster) {
              promises.push(
                this.getFollowLink(result.roster)
                .then(({members}: any) => {
                  result.roster = {members};
                })
                .catch(console.error)
              );
            }
            if (result.achievements) {
              promises.push(this.getFollowLink(result.achievements)
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
                .catch(console.error));
            }
            if ((result as any).activity) {
              promises.push(this.getFollowLink((result as any).activity)
                .then(({activities}) => {
                  delete (result as any).activity;
                  result.activities = activities;
                })
                .catch(console.error));
            }
            await Promise.all(promises);
          }
          resolve(cleanGuildData(result));
        })
        .catch(reject)
    });
  }
}
