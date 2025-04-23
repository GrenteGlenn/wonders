export default interface LocalisationInterface {
  id?: number;
  lng: string;
  lat: string;
  country_id: number;
  city_id: number;
  city_name: string;
  created_at?: Date;
  updated_at?: Date;
}
