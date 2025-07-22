export interface User {
  email: string,
  password?: string,
  role_id: number,
  first_name: string,
  last_name: string,
  birth_date: Date,
  country_id: any,
  language_id: number,
  img?: string
}

export interface FetchableUser {
  [x: string]: any
  id: number,
  email: string,
  password?: string,
  first_name: string,
  last_name: string,
  birth_date: Date,
  role_id: number,
  country_id: any,
  language_id: number,
  user?: User,
  img?: string
}
