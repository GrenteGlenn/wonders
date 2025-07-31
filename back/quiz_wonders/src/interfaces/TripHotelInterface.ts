import { Status } from './Global';

export default interface TripHotelInterface {
  id?: number;
  trip_city_id?: number;
  name: string;
  price: number;
  from: Date;
  to: Date;
  url: string;
  adults: number;
  children: number;
  longitude: number;
  latitude: number;
  status: Status;
  created_at: Date;
  updated_at: Date;
}
