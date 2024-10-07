export default interface TripHotelInterface {
    id: number;
    trip_city_id: number;
    name: string;
    price: number;
    from: Date;
    to: Date;
    url: string;
    created_at: Date;
    updated_at: Date;
}