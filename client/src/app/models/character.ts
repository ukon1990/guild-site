import {Guild} from './guild.model';

export interface Appearance {
  itemId: number;
  itemAppearanceModId: number;
  transmogItemAppearanceModId: number;
}

export interface RewardItem {
  id: number;
  name: string;
  icon: string;
  quality: number;
  itemLevel: number;
  tooltipParams: TooltipParams;
  stats: any[];
  armor: number;
  context: string;
  bonusLists: any[];
  displayInfoId: number;
  artifactId: number;
  artifactAppearanceId: number;
  artifactTraits: any[];
  relics: any[];
  appearance: Appearance;
}

export interface Criterion {
  id: number;
  description: string;
  orderIndex: number;
  max: number;
}

export interface Achievement {
  id: number;
  title: string;
  points: number;
  description: string;
  rewardItems: RewardItem[];
  icon: string;
  criteria: Criterion[];
  accountWide: boolean;
  factionId: number;
  reward: string;
}

export interface Criteria {
  id: number;
  description: string;
  orderIndex: number;
  max: number;
}

export class Feed {
  type: string;
  timestamp: any;
  achievement: Achievement;
  featOfStrength: boolean;
  criteria: Criteria;
  quantity?: number;
  name: string;
  itemId?: number;
  context: string;
  bonusLists: number[];
}

export interface TooltipParams {
  set: any[];
  gem0: any;
  gem1: any;
  gem2: any;
  enchant: any;
  transmogItem: number;
  timewalkerLevel: number;
  azeritePower0: number;
  azeritePower1: number;
  azeritePower2: number;
  azeritePower3: number;
  azeritePowerLevel: number;
  azeritePower4: number;
}

export interface Stat {
  stat: number;
  amount: number;
}

export interface AzeriteItem {
  azeriteLevel: number;
  azeriteExperience: number;
  azeriteExperienceRemaining: number;
}

export interface AzeritePower {
  id: number;
  tier: number;
  spellId: number;
  bonusListId: number;
}

export interface AzeriteEmpoweredItem {
  azeritePowers: AzeritePower[];
}

export interface Item {
  id: number;
  name: string;
  icon: string;
  quality: number;
  itemLevel: number;
  tooltipParams: TooltipParams;
  stats: Stat[];
  armor: number;
  weaponInfo: WeaponInfo;
  context: string;
  bonusLists: number[];
  displayInfoId: number;
  artifactId: number;
  artifactAppearanceId: number;
  artifactTraits: any[];
  relics: any[];
  appearance: Appearance;
  azeriteItem: AzeriteItem;
  azeriteEmpoweredItem: AzeriteEmpoweredItem;
}

export interface Damage {
  min: number;
  max: number;
  exactMin: number;
  exactMax: number;
}

export interface WeaponInfo {
  damage: Damage;
  weaponSpeed: number;
  dps: number;
}

export interface Items {
  averageItemLevel: number;
  averageItemLevelEquipped: number;
  head: Item;
  neck: Item;
  shoulder: Item;
  back: Item;
  chest: Item;
  shirt: Item;
  tabard: Item;
  wrist: Item;
  hands: Item;
  waist: Item;
  legs: Item;
  feet: Item;
  finger1: Item;
  finger2: Item;
  trinket1: Item;
  trinket2: Item;
  mainHand: Item;
  offHand: Item;
}

export interface Reputation {
  id: number;
  name: string;
  standing: number;
  value: number;
  max: number;
}

export interface Achievements {
  achievementsCompleted: number[];
  achievementsCompletedTimestamp: any[];
  criteria: number[];
  criteriaQuantity: any[];
  criteriaTimestamp: any[];
  criteriaCreated: any[];
}

export interface Statistic {
  id: number;
  name: string;
  quantity: any;
  lastUpdated: any;
  money: boolean;
  highest: string;
}

export interface SubCategory {
  id: number;
  name: string;
  statistics: Statistic[];
  subCategories?: SubCategory[];
}

export interface Statistics {
  id: number;
  name: string;
  subCategories: SubCategory[];
}

export interface Spell {
  id: number;
  name: string;
  icon: string;
  description: string;
  castTime: string;
  range: string;
  powerCost: string;
  cooldown: string;
}

export interface Spec {
  name: string;
  role: string;
  backgroundImage: string;
  icon: string;
  description: string;
  order: number;
}

export interface Talent {
  selected: boolean;
  talents: Talent[];
  spec: Spec;
  calcTalent: string;
  calcSpec: string;
}

export interface Collected {
  name: string;
  spellId: number;
  creatureId: number;
  itemId: number;
  qualityId: number;
  icon: string;
  isGround: boolean;
  isFlying: boolean;
  isAquatic: boolean;
  isJumping: boolean;
  stats: Stats;
  battlePetGuid: string;
  isFavorite: boolean;
  isFirstAbilitySlotSelected: boolean;
  isSecondAbilitySlotSelected: boolean;
  isThirdAbilitySlotSelected: boolean;
  creatureName: string;
  canBattle: boolean;
}

export interface Mounts {
  numCollected: number;
  numNotCollected: number;
  collected: Collected[];
}

export interface Stats {
  speciesId: number;
  breedId: number;
  petQualityId: number;
  level: number;
  health: number;
  power: number;
  speed: number;
}

export interface Pets {
  numCollected: number;
  numNotCollected: number;
  collected: Collected[];
}

export interface Boss {
  id: number;
  name: string;
  normalKills: number;
  normalTimestamp: any;
  heroicKills?: number;
  heroicTimestamp?: number;
  lfrKills?: number;
  lfrTimestamp?: number;
  mythicKills?: number;
  mythicTimestamp?: number;
}

export interface Raid {
  name: string;
  lfr: number;
  normal: number;
  heroic: number;
  mythic: number;
  id: number;
  bosses: Boss[];
}

export interface Progression {
  raids: Raid[];
}

export interface ArenaBracket {
  slug: string;
  rating: number;
  weeklyPlayed: number;
  weeklyWon: number;
  weeklyLost: number;
  seasonPlayed: number;
  seasonWon: number;
  seasonLost: number;
  tier: number;
}

export interface Brackets {
  ARENA_BRACKET_2v2: ArenaBracket;
  ARENA_BRACKET_3v3: ArenaBracket;
  ARENA_BRACKET_RBG: ArenaBracket;
  ARENA_BRACKET_2v2_SKIRMISH: ArenaBracket;
  UNKNOWN: ArenaBracket;
}

export interface Pvp {
  brackets: Brackets;
}

export interface AuditSlots {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  11: number;
  12: number;
  13: number;
  14: number;
}

export interface ItemSpell {
  spellId: number;
  nCharges: number;
  consumable: boolean;
  categoryId: number;
  trigger: string;
  scaledDescription: string;
}

export interface ItemSource {
  sourceId: number;
  sourceType: string;
}

export interface BonusSummary {
  defaultBonusLists: any[];
  chanceBonusLists: any[];
  bonusChances: any[];
}

export interface RecommendedBeltBuckle {
  id: number;
  description: string;
  name: string;
  icon: string;
  stackable: number;
  itemBind: number;
  bonusStats: any[];
  itemSpells: ItemSpell[];
  buyPrice: number;
  itemClass: number;
  itemSubClass: number;
  containerSlots: number;
  inventoryType: number;
  equippable: boolean;
  itemLevel: number;
  maxCount: number;
  maxDurability: number;
  minFactionId: number;
  minReputation: number;
  quality: number;
  sellPrice: number;
  requiredSkill: number;
  requiredLevel: number;
  requiredSkillRank: number;
  itemSource: ItemSource;
  baseArmor: number;
  hasSockets: boolean;
  isAuctionable: boolean;
  armor: number;
  displayInfoId: number;
  nameDescription: string;
  nameDescriptionColor: string;
  upgradable: boolean;
  heroicTooltip: boolean;
  context: string;
  bonusLists: any[];
  availableContexts: string[];
  bonusSummary: BonusSummary;
  artifactId: number;
}

export interface Audit {
  numberOfIssues: number;
  slots: AuditSlots;
  emptyGlyphSlots: number;
  unspentTalentPoints: number;
  noSpec: boolean;
  unenchantedItems: AuditSlots;
  emptySockets: number;
  itemsWithEmptySockets: AuditSlots;
  appropriateArmorType: number;
  inappropriateArmorType: AuditSlots;
  lowLevelItems: AuditSlots;
  lowLevelThreshold: number;
  missingExtraSockets: AuditSlots;
  recommendedBeltBuckle: RecommendedBeltBuckle;
  missingBlacksmithSockets: AuditSlots;
  missingEnchanterEnchants: AuditSlots;
  missingEngineerEnchants: AuditSlots;
  missingScribeEnchants: AuditSlots;
  nMissingJewelcrafterGems: number;
  missingLeatherworkerEnchants: AuditSlots;
}

export interface Character {
  lastModified: number;
  name: string;
  realm: string;
  battlegroup: string;
  class: number;
  race: number;
  gender: number;
  level: number;
  achievementPoints: number;
  thumbnail: string;
  calcClass: string;
  faction: number;
  guild: Guild;
  feed: Feed[];
  items: Items;
  reputation: Reputation[];
  achievements: Achievements;
  statistics: Statistics;
  talents: Talent[];
  mounts: Mounts;
  pets: Pets;
  progression: Progression;
  pvp: Pvp;
  audit: Audit;
  spec?: Spec;
  totalHonorableKills: number;
}
