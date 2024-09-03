import User from './UserInterface';
import Country from './CountryInterface';

export default interface AddressInterface {
  id?: number;
  name: string;
  street: string;
  city: string;
  zip_code: string;
  complementary: string;
  created_at: Date;
  updated_at: Date;
  country_id: Country;
  userId: User;
}
