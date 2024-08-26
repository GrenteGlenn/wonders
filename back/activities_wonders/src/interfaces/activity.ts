import activityCategory from './activityCategory';

export default interface activity {
  id: number;
  name: string;
  url: string;
  description: Text;
  isFree: boolean;
  category: activityCategory;
  created_at?: Date;
  updated_at?: Date;
}
