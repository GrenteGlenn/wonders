export default interface TripInterface {
  id?: number;
  user_id: number;
  country_id: number;
  duration: number;
  from_date: Date;
  to_date: Date;
  transportation_id: number;
  created_at: Date;
  updated_at: Date;
}
