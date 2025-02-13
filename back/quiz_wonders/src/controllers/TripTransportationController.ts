import TripTransportation from '../../models/triptransportation';

export default class TripTransportationController {
  async list() {
    return await TripTransportation.findAll();
  }
  async one(id: number) {
    const tripTransportation = await TripTransportation.findByPk(id);
    if (tripTransportation) {
      return tripTransportation;
    }
  }
  async new(from_date: Date, to_date: Date, price: number, url: string, created_at: Date, updated_at: Date) {
    try {
      return await TripTransportation.create({ from_date, to_date, price, url, created_at, updated_at });
    } catch (error) {
      console.error('Error creating trip transportation:', error);
    }
  }
  async update(id: number, from_date: Date, to_date: Date, price: number, url: string) {
    try {
      const tripTransportation = await TripTransportation.findByPk(id);

      if (!tripTransportation) {
        return { status: 404, message: 'Trip not found' };
      }

      tripTransportation.from_date = from_date;
      tripTransportation.to_date = to_date;
      tripTransportation.price = price;
      tripTransportation.url = url;
      await tripTransportation.save();

      return tripTransportation;
    } catch (error) {
      console.error('Error updating trip transportation:', error);
    }
  }
  async delete(id: number) {
    try {
      const trip = await TripTransportation.findByPk(id);

      if (!trip) {
        console.error('Trip transportation not found');
      } else {
        await trip.destroy();
      }
      console.log('Trip transportation deleted successfully');
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  }
}
