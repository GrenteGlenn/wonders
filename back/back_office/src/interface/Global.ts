export interface Activity {
    id: number;
    activity_id: number;
    status: string;
}

export interface TripCityDay {
    id: number;
    trip_city_id: number;
    date: string;
    activities: Activity[];
}

export interface TripState {
    cities: TripCity[] | [];
    country_id: number;
    duration:number;
    from_date:string
    id:number;
    to_date:string;
    trip_transportation:Transportation;
    user_id:number
}

export interface Transportation {
    id: number;
    from_date: string;
    to_date: string;
    price: number;
    url: string;
    status: string;
}

export interface TripCity {
    id: number;
    trip_id: number;
    city_id: number;
    tripCityDays: TripCityDay[];
    transportation: Transportation;
}

export interface TripCityData {
    id: number;
    trip_id: number;
    city_id: number;
    tripCityDays: TripCityDay[];
    transportation: Transportation;
    hotel: Hotel[];
}

export interface Hotel {
    id: number;
    trip_city_id: number;
    name: string;
    price: number;
    from: string;
    to: string;
    url: string;
    adults: number;
    children: number;
    longitude: number;
    latitude: number;
    status: string
}