import TripDay from '../../models/tripday';

export default class TripDayController {
    async list() {
        return await TripDay.findAll();
    }
    async one(id: number) {
        return await TripDay.findByPk(id);
    }
    async new(trip_id: number, transportation_id: number, city_id: number, created_at: Date, updated_at: Date) {
        return await TripDay.create({ trip_id, transportation_id, city_id, created_at, updated_at })
    }
    async update(id: number, transportation_id: number, city_id: number) {
        const tripDay = await TripDay.findByPk(id);
        if (tripDay) {
            tripDay.transportation_id = transportation_id
            tripDay.city_id = city_id
            await tripDay.save();
            return tripDay;

        }
    }
    async delete(id: number) {
        const tripDay = await TripDay.findByPk(id);
        return tripDay?.destroy();
    }
}