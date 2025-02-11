import TripDay from '../../models/tripday';

export default class TripDayController {
  async list() {
    return await TripDay.findAll();
  }
  async one(id: number) {
    return await TripDay.findByPk(id);
  }
  async new(trip_city_id: number, date: Date, created_at: Date, updated_at: Date) {
    return await TripDay.create({ trip_city_id, date, created_at, updated_at });
  }
  async update(id: number, trip_city_id: number, date: Date) {
    const tripDay = await TripDay.findByPk(id);
    if (tripDay) {
      tripDay.date = date;
      tripDay.trip_city_id = trip_city_id;
      await tripDay.save();
      return tripDay;
    }
  }
  async delete(id: number) {
    const tripDay = await TripDay.findByPk(id);
    return tripDay?.destroy();
  }
}
