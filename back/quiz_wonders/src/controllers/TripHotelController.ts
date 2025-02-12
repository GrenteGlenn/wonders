import TripHotel from '../../models/triphotel';

export default class TripHotelController {
  async list() {
    return await TripHotel.findAll();
  }

  async one(id: number) {
    return await TripHotel.findByPk(id);
  }

  async new(
    trip_city_id: number,
    name: string,
    from: Date,
    price: number,
    to: Date,
    url: string,
    created_at: Date,
    updated_at: Date
  ) {
    return await TripHotel.create({ trip_city_id, name, from, price, to, url, created_at, updated_at });
  }

  async update(
    id: number,
    trip_city_id: number,
    name: string,
    from: Date,
    price: number,
    to: Date,
    url: string,
    updated_at: Date
  ) {
    const tripHotel = await TripHotel.findByPk(id);
    if (tripHotel) {
      tripHotel.name = name;
      tripHotel.trip_city_id = trip_city_id;
      tripHotel.from = from;
      tripHotel.price = price;
      tripHotel.to = to;
      tripHotel.url = url;
      tripHotel.updated_at = updated_at;
      await tripHotel.save();
      return tripHotel;
    }
  }

  async delete(id: number) {
    const tripHotel = await TripHotel.findByPk(id);
    return tripHotel?.destroy();
  }
}
