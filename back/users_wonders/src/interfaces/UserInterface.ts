import Role from './RoleInterface';
import Language from './LanguageInterface';

export default interface UserInterface {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  birthDate: Date;
  languageId: Language;
  role?: Role[];
}
