import TripCity from '../../models/tripcity';

export default class TripCityController {
  async list() {
    return await TripCity.findAll();
  }
  async one(id: number) {
    const tripCity = await TripCity.findByPk(id);
    if (tripCity) {
      return tripCity;
    }
  }
  async new(trip_id: number, city_id: number, transportation_id: number, created_at: Date, updated_at: Date) {
    try {
      return await TripCity.create({ transportation_id, trip_id, city_id, created_at, updated_at });
    } catch (error) {
      console.log('resource cannot be created');
    }
  }
  async update(id: number, trip_id: number, city_id: number, transportation_id: number, updated_at: Date) {
    try {
      const tripCity = await TripCity.findByPk(id);

      if (tripCity) {
        tripCity.trip_id = trip_id;
        tripCity.city_id = city_id;
        tripCity.transportation_id = transportation_id;
        tripCity.updated_at = updated_at;
        await tripCity.save();
        return tripCity;
      }
    } catch (error) {
      console.error('Error updating TripCity:', error);
    }
  }

  async delete(id: number) {
    try {
      const tripCity = await TripCity.findByPk(id);
      if (tripCity) {
        await tripCity.destroy();
        return console.log('TripCity deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting TripCity:', error);
    }
  }
}
