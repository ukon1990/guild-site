import {BlizzardService} from "@libs/services/blizzard.service";

export class CharacterService extends BlizzardService<any> {
  constructor(region: string) {
    super(
      region,
      'profile',
      'character'
    );
  }

  getCharacter(realm: string, character: string) {
    return new Promise<any>(async (resolve, reject) => {
      this.get(`${realm}/${character}`)
        .then(async result => {
          const promises: Promise<void>[] = [];
          if (result.statistics) {
            promises.push(
              this.getFollowLink(result.statistics)
                .then(statistics => {
                  result.statistics = statistics;
                }).catch(console.error)
            );
          }
          if (result.encounters) {
            promises.push(this.getFollowLink(result.encounters)
              .then(async encounters => {
                await Promise.all([
                  this.getFollowLink(encounters.dungeons)
                    .then(d => result.encounters.dungeons = d).catch(console.error),
                  this.getFollowLink(encounters.raids)
                    .then(r => result.encounters.raids = r).catch(console.error)
                ]).catch(console.error)
              }).catch(console.error));
            result.encounters = {};
          }
          if (result.media) {
            promises.push(
              this.getFollowLink(result.media)
                .then(media => {
                  delete media.character;
                  result.media = media;
                }).catch(console.error)
            );
          }
          if (result.mythic_keystone_profile) {
            promises.push(
              this.getFollowLink(result.mythic_keystone_profile)
                .then(mythicKeyProfile => result.mythic_keystone_profile = mythicKeyProfile).catch(console.error)
            );
          }
          if (result.equipment) {
            promises.push(
              this.getFollowLink(result.equipment)
                .then(equipment => result.equipment = equipment).catch(console.error)
            );
          }
          if (result.reputations) {
            promises.push(
              this.getFollowLink(result.reputations)
                .then(reputations => result.reputations = reputations).catch(console.error)
            );
          }
          if (result.professions) {
            result.professions = {};
            promises.push(
              this.getFollowLink(result.professions)
                .then(professions => result.professions = professions).catch(console.error)
            );
          }
          await Promise.all(promises).catch(console.error);
          delete result._links;
          resolve(result);
        })
        .catch(reject)
    });
  }
}
