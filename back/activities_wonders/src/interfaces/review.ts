export default interface Review {
    id: number;
    name: string;
    description: Text;
    isFree: boolean;
    Price: number;
    duration: number;
    user_id: number;
    activity_id: number;
    rating_id: number;
    created_at?: Date;
    updated_at?: Date;
}