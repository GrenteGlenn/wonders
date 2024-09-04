export default interface activity {
  id: number;
  name: string;
  url: string;
  description: Text;
  isFree: boolean;
  duration: number;
  price: number;
  partner: string;
  category_id: number;
  created_at?: Date;
  updated_at?: Date;
}
