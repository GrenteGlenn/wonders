export interface User {
  email: string,
  password?: string,
  role_id: number,
  first_name: string,
  last_name: string,
  birth_date: Date,
  country_id: any,
  language_id: number
}

export interface FetchableUser {
  id: number,
  email: string,
  password?: string,
  first_name: string,
  last_name: string,
  birth_date: Date,
  country_id: any,
  language_id: number
}
