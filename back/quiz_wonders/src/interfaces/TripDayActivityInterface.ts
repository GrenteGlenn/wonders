import { Status } from './Global';

export default interface TripDayActivityInterface {
  id?: number;
  trip_day_id: number;
  activity_id: number;
  status: Status;
  created_at?: Date;
  updated_at?: Date;
}
