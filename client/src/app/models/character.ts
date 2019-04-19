export class Character {
  lastModified: number;
  name: string;
  realm: string;
  battlegroup: string;
  class: number;
  spec: Specialization;
  race: number;
  gender: number;
  level: number;
  items: any;
  guild: string;
  achievementPoints: number;
  totalHonorableKills: number;
  thumbnail: string; // draenor/217/111484633-avatar.jpg
  calcClass: string;
  faction: string; // 0 = ally, 1 = horde
  professions: {
    primary: Array<Profession>,
    secondary: Array<Profession>
  };
  statistics?: CharacterStatistic[];
  mounts?: {
    numCollected: number;
    numNotCollected: number;
    mounts: Mount;
  };
  pets?: Pet[];
  petSlots?: PetSlot[];
}

export class Specialization {
  backgroundImage: string;
  description: string;
  icon: string;
  name: string;
  order: number;
  role: string;
}

class Profession {
  name: string;
  icon: string;
  rank: number;
  max: number;
  recipes: Array<Number>;
}

class CharacterStatisticCategory {
  id: number;
  name: string;
  statistics?: Array<CharacterStatistic>;
  subCategories?: Array<CharacterStatisticCategory>;
}

class CharacterStatistic {
  id: number;
  name: string;
  quantity: number;
  lastUpdated: number;
  money: false;
}

class Mount {
}

class Pet {
}

class PetSlot {
}
