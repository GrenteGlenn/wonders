import Language from './LanguageInterface';

export default interface UserInterface {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  birth_date: Date;
  language_id: Language;
}
