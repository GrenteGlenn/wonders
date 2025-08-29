export interface ResponseMe {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  birth_date: string;
  language_id: number;
  country_id: number;
  role_id: number;
  img: string | null;
  created_at?: string;
  updated_at?: string;
  role: Role;
}

export interface Role {
  id?: number;
  role: string;
}
