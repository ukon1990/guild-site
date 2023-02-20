import {BlizzardService} from "@libs/services/blizzard.service";

export class PlayableClassService extends BlizzardService<any> {
  constructor(region: string) {
    super(
      region,
      'data',
      'playable-class'
    );
  }

  getClasses() {
    return new Promise<any>(async (resolve, reject) => {
      this.get(`index`)
        .then(async ({classes}) => {
          const promises: Promise<void>[] = [];
          classes.forEach(playableClass => {
            promises.push(
              this.getFollowLink(playableClass)
                .then(async ({specializations, media}) => {
                  playableClass.specializations = specializations;
                  await this.getFollowLink(media)
                    .then(({assets}) => {
                      playableClass.media = {assets};
                    })
                }).catch(console.error)
            );
          });
          await Promise.all(promises).catch(console.error);
          resolve(classes);
        })
        .catch(reject)
    });
  }
}
