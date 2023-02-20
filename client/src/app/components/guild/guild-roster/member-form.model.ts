import {FormControl} from "@angular/forms";

export interface MemberFormModel {
  name: FormControl<string | null>;
  minimumLevel: FormControl<number | null>;
  rank: FormControl<number | null>;
  playableClass: FormControl<number | null>;
}
export interface MemberSearchModel {
  name: string | null;
  minimumLevel: number | null;
  rank: number | null;
  playableClass: number | null;
}
