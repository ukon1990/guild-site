import {CharacterComponent} from "./character.component";
import {RouteHiddenFlag} from "../../enums";
import {TitledRoute} from "../../models/route/titled-route.model";

export const characterRoutes: TitledRoute = {
  path: ':region/:realm/character/:slug',
  component: CharacterComponent,
  isHidden: RouteHiddenFlag.ALWAYS
};
