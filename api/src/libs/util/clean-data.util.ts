import {Guild} from "@libs/models/guild.model";

export const cleanGuildData = (guild: Guild.Guild): Guild.Guild => {
  delete guild._links;
  delete guild.realm.key;
  delete guild.crest.emblem.media.key;
  delete guild.crest.border.media.key;

  guild.roster.members.forEach(member => {
    delete member.character.key;
    delete member.character.playable_class.key;
    delete member.character.playable_race.key;
    delete member.character.realm.key;
  });
  guild.achievements.achievements.forEach(achievement => {
    delete achievement.achievement.key;
  });
  guild.achievements.category_progress.forEach(({category}) => {
    delete category.key;
  });
  guild.achievements.recent_events.forEach(({achievement}) => {
    delete achievement.key;
  });
  guild.activities.forEach(event => {
    delete event.character_achievement?.achievement?.key;
    delete event.character_achievement?.character?.key;
    delete event.character_achievement?.character?.realm?.key;
    delete event.character_achievement?.achievement?.key;
    delete event.encounter_completed?.encounter?.key;
  });
  return guild;
};
