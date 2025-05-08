import TripTransportationInterface from './TripTransportationInterface';
import TripInterface from './TripInterface';
import TripDayActivityInterface from './TripDayActivityInterface';
import TripHotelInterface from './TripHotelInterface';

enum Status {
  APayer,
  EnAttenteDeReservation,
  EnAttenteDeConfirmation,
  ProblemeDeReservation,
  Reserve,
  Annuler
}

interface Activity {
  id: number;
  activity_id: number;
}

interface TripCityDay {
  id: number;
  trip_city_id: number;
  date: Date;
  tripDayActivities: Activity[];
}

interface City {
  id: number;
  trip_id: number;
  city_id: number;
  tripCityDays: TripCityDay[];
  transportations: TripTransportationInterface;
  tripDayActivities: TripDayActivityInterface[];
  tripCityHotel: TripHotelInterface;
}

interface Trip {
  id: number;
  from_date: string;
  to_date: string;
  user_id: number;
  country_id: number;
  duration: number;
}

interface FullTrip {
  trip: TripInterface;
  trip_transportation: TripTransportationInterface;
  trip_cities: City[];
}

type TripsData = FullTrip[];

export { Trip, FullTrip, TripsData, TripCityDay, City, Activity, Status };
