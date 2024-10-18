export interface User {
  email: string,
  password?: string,
  first_name: string,
  last_name: string,
  birth_date: Date,
  country: string,
  language_id: number
}
