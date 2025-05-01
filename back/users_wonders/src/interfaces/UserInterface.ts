import Language from './LanguageInterface';

export default interface UserInterface {
  id?: number;
  country_id: number;
  role_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  img: string;
  created_at?: Date;
  updated_at?: Date;
  birth_date: Date;
  language_id: Language;
}
