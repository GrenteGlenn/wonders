import Image from './image';

export default interface activityCategory {
  id: number;
  name: string;
  image: Image;
  created_at?: Date;
  updated_at?: Date;
}
