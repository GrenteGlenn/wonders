export default interface activity {
  id: number;
  name: string;
  url: string;
  description: Text;
  isFree: boolean;
  category_id: number;
  created_at?: Date;
  updated_at?: Date;
}
