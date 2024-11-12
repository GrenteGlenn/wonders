import TripDayActivity from '../../models/tripdayactivity';

export default class TripDayActivityController {
    async list() {
        return await TripDayActivity.findAll();
    }
    async one(id: number) {
        return await TripDayActivity.findByPk(id)
    }
    async new(trip_day_id: number, activity_id: number, created_at: Date, updated_at: Date) {
        return await TripDayActivity.create({ trip_day_id, activity_id, created_at, updated_at })
    }
    async update(id: number, trip_day_id: number, activity_id: number) {
        const tripDayActivity = await TripDayActivity.findByPk(id)
        if (tripDayActivity) {
            tripDayActivity.activity_id = activity_id;
            tripDayActivity.trip_day_id = trip_day_id;
            tripDayActivity.save()
            return tripDayActivity;
        }
    }
    async delete(id: number) {
        const tripDayActivity = await TripDayActivity.findByPk(id)
        if (tripDayActivity) {
            tripDayActivity.destroy();
        }
    }
}