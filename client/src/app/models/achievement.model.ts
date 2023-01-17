import {RecentEvent} from "./guild.model";


export interface AchievementDescription {
  name: string;
  id: number;
}

export interface ChildCriteria {
  id: number;
  amount: number;
  is_completed: boolean;
}

export interface Criteria {
  id: number;
  is_completed: boolean;
  child_criteria: ChildCriteria[];
  amount?: number;
}

export interface Category {
  name: string;
  id: number;
}

export interface CategoryProgress {
  category: Category;
  quantity: number;
  points: number;
}

export interface Achievements {
  total_quantity: number;
  total_points: number;
  achievements: Achievement[];
  category_progress: CategoryProgress[];
  recent_events: RecentEvent[];
}

export interface Achievement {
  id: number;
  achievement: AchievementDescription;
  criteria: Criteria;
  completed_timestamp: any;
}
