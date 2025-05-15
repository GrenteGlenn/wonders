import Language from './LanguageInterface';
import RoleInterface from './RoleInterface';

export default interface UserInterface {
  id?: number;
  country_id: number;
  role_id: number;
  role?: RoleInterface;
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

export interface UserUpdateInterface {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  country_id?: number;
  role_id?: number;
  img?: string;
  birth_date?: Date;
  language_id?: number;
}

