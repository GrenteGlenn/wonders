export default interface CityInterface {
  id?: number;
  name: string;
  country_id: number;
  longitude: number;
  latitude: number;
  created_at?: Date;
  updated_at?: Date;
}
