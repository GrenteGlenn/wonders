export default interface CountryInterface {
  id?: number;
  name: string;
  code: string;
  image: string;
  description?: Text;
  created_at?: Date;
  updated_at?: Date;
}
