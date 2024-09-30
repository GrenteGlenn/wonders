
export default interface TripInterface {
    id: number;
    user_id: number;
    country_id: number;
    duration: number;
    from: Date;
    to: Date;
    transportation_id: number;
    created_at: Date;
    updated_at: Date;
}