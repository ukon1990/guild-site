import {Locale} from "./locale.model";

export interface Encounter {
  name: Locale;
  id: number;
}

export interface Mode {
  type: string;
  name: Locale;
}

export interface EncounterCompleted {
  encounter: Encounter;
  mode: Mode;
}
