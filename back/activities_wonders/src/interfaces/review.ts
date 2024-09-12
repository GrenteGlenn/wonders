export default interface Review {
  id: number;
  comment: Text;
  user_id: number;
  activity_id: number;
  rating_id: number;
  created_at?: Date;
  updated_at?: Date;
}
