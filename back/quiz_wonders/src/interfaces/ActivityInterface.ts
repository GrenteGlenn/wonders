export default interface ActivityInterface {
  id?: number;
  name: string;
  place_id: string;
  rating: number;
  price_level: number | null;
  address: string;
  created_at?: Date;
  updated_at?: Date;
}
