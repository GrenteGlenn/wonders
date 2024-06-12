
import Role from './RoleInterface';
import Country from './CountryInterface';
import Language from './LanguageInterface';

export default interface User {
    id: number;
    name: string;
    surname: string;
    createdAt: Date;
    updatedAt: Date;
    birthDate: Date;
    email: string;
    password: string;
    role: Role[];
    language: Language;
    country: Country;
}