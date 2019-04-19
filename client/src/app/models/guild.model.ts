import { Character } from './character';

export class Guild {
  name: string;
  realm: string;
  achievementPoints: number;
  battlegroup: string;
  level: number;
  emblem: Emblem;
  members: Array<Member>;
}

class Member {
  character: Character;
  rank: number;
}

class Emblem {
  backgroundColor: string;
  backgroundColorId: number;
  border: number;
  borderColor: string;
  borderColorId: string;
  icon: string;
  iconColor: string;
  iconColorId: string;
}
