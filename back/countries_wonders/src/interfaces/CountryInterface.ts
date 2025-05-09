export default interface CountryInterface {
  id?: number;
  name: string;
  code: string;
  image: string;
  description?: string;
  language: number;
  longitude: number;
  latitude: number;
  updated_at_description?: Date;
  created_at?: Date;
  updated_at?: Date;
}
