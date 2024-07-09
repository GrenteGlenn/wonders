import User from './UserInterface';
import Country from './CountryInterface';

export default interface AddressInterface {
  id?: number;
  name: string;
  street: string;
  city: string;
  zipCode: string;
  complementary: string;
  countryId: Country;
  userId: User;
}
