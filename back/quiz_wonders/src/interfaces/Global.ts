import TripTransportationInterface from './TripTransportationInterface';
import TripInterface from './TripInterface';
import TripDayActivityInterface from './TripDayActivityInterface';
import TripHotelInterface from './TripHotelInterface';

export enum Status {
  APayer = 'APayer',
  EnAttenteDeReservation = 'EnAttenteDeReservation',
  EnAttenteDeConfirmation = 'EnAttenteDeConfirmation',
  ProblemeDeReservation = 'ProblemeDeReservation',
  Reserve = 'Reserve',
  Annuler = 'Annuler'
}

export interface Activity {
  id: number;
  activity_id: number;
  activityName?: string;
}

export interface TripCityDay {
  id: number;
  trip_city_id: number;
  date: Date;
  tripDayActivities: Activity[];
}

export interface City {
  id: number;
  trip_id: number;
  city_id: number;
  tripCityDays: TripCityDay[];
  transportations: TripTransportationInterface;
  tripDayActivities: TripDayActivityInterface[];
  tripCityHotel: TripHotelInterface;
}

export interface Trip {
  id: number;
  from_date: string;
  to_date: string;
  user_id: number;
  country_id: number;
  duration: number;
}

export interface FullTrip {
  trip: TripInterface;
  trip_transportation: TripTransportationInterface;
  trip_cities: City[];
}

export type TripsData = FullTrip[];

export interface BodyCity {
  name: string;
  country: number;
  longitude: number;
  latitude: number;
  created_at: Date;
  updated_at: Date;
}

export interface Country {
  id?: number;
  name: string;
  code: string;
  image: string;
  description?: string;
  language: number;
  longitude: number;
  latitude: number;
  updated_at_description?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface User {
  id?: number;
  country_id: number;
  role_id: number;
  role?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  img: string;
  created_at?: Date;
  updated_at?: Date;
  birth_date: Date;
  language_id?: number;
}

export interface Activity {
  id: number;
  activity_id: number;
  status: string;
}

export interface Transportation {
  id?: number;
  from_date: string;
  to_date: string;
  price: number;
  url: string;
  status: string;
}

export interface CityDetail {
  id?: number;
  trip_id: number;
  city_id: number;
  tripCityDays: TripCityDayDetail[];
  transportation: Transportation;
  city?: string;
  countries?: string;
}

export interface TripCityDayDetail {
  id: number;
  trip_city_id: number;
  date: string;
  activities: Activity[];
}

export interface TripDetail {
  id: number;
  from_date: string;
  to_date: string;
  user_id: number;
  country_id: number;
  duration: number;
  trip_transportation: number;
  cities: CityDetail[];
}

export interface ActivityDetail {
  id: number;
  name: string;
  url: string;
  description: Text;
  is_free: boolean;
  duration: number;
  price: number;
  partner: string;
  category_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CityDetail {
  id?: number;
  name: string;
  country_id: number;
  longitude: number;
  latitude: number;
  created_at?: Date;
  updated_at?: Date;
}

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
