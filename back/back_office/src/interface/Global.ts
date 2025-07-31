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