export default interface AirportInterface {
  id?: number;
  name: string;
  code: string;
  city_id: number;
  longitude: number;
  latitude: number;
  created_at?: Date;
  updated_at?: Date;
}
