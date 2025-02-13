import TripController from '../controllers/TripController';
import Trip from '../../models/trip';
import TripTransportation from '../../models/triptransportation';
import TripCity from '../../models/tripcity';
import TripDay from '../../models/tripday';
import TripDayActivity from '../../models/tripdayactivity';
import api from '../services/api/countriesService';

jest.mock('../../models/trip');
jest.mock('../../models/triptransportation');
jest.mock('../../models/tripcity');
jest.mock('../../models/tripday');
jest.mock('../../models/tripdayactivity');
jest.mock('../services/api/countriesService');  // Mock de l'API externe

describe('TripController Tests', () => {
  let tripController: TripController;

  beforeEach(() => {
    tripController = new TripController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fullTrips', () => {
    it('should return all trips', async () => {
      const mockTrips = [{ id: 1, name: 'Trip 1' }, { id: 2, name: 'Trip 2' }];
      (Trip.findAll as jest.Mock).mockResolvedValue(mockTrips);

      const result = await tripController.fullTrips();
      expect(result).toEqual(mockTrips);
      expect(Trip.findAll).toHaveBeenCalled();
    });
  });

  describe('fullTrip', () => {
    it('should return a trip with related data', async () => {
      const mockTrip = {
        id: 1,
        name: 'Trip 1',
        trip_transportation: [{ id: 1, name: 'Transport 1' }],
        cities: [
          {
            id: 1,
            name: 'City 1',
            tripCityDays: [
              {
                id: 1,
                activities: [{ id: 1, name: 'Activity 1' }]
              }
            ]
          }
        ]
      };
      
      // Mock des appels API
      (api.get as jest.Mock).mockResolvedValue({ data: { name: 'Fact' } });

      // Mock de la recherche dans Trip
      (Trip.findOne as jest.Mock).mockResolvedValue(mockTrip);

      const result = await tripController.fullTrip(1);

      expect(result).toEqual(mockTrip);
      expect(Trip.findOne).toHaveBeenCalledWith(expect.objectContaining({
        where: { id: 1 },
        include: expect.anything(),
      }));
    });

    it('should call the external API correctly', async () => {
      const mockResponse = { data: { name: 'Fact' } };
      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await tripController.fullTrip(1);

      expect(api.get).toHaveBeenCalledWith('/fact');
      expect(result).toBeDefined();
    });
  });

  describe('list', () => {
    it('should return all trips', async () => {
      const mockTrips = [{ id: 1, name: 'Trip 1' }];
      (Trip.findAll as jest.Mock).mockResolvedValue(mockTrips);

      const result = await tripController.list();
      expect(result).toEqual(mockTrips);
    });
  });

  describe('one', () => {
    it('should return a specific trip by ID', async () => {
      const mockTrip = { id: 1, name: 'Trip 1' };
      (Trip.findByPk as jest.Mock).mockResolvedValue(mockTrip);

      const result = await tripController.one(1);
      expect(result).toEqual(mockTrip);
    });

    it('should return undefined if no trip is found', async () => {
      (Trip.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await tripController.one(999);
      expect(result).toBeUndefined();
    });
  });

  describe('new', () => {
    it('should create a new trip', async () => {
      const newTrip = {
        user_id: 1,
        country_id: 1,
        duration: 10,
        from_date: new Date(),
        to_date: new Date(),
        transportation_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const createdTrip = { id: 1, ...newTrip };
      (Trip.create as jest.Mock).mockResolvedValue(createdTrip);

      const result = await tripController.new(1, 1, 10, new Date(), new Date(), 1, new Date(), new Date());
      expect(result).toEqual(createdTrip);
    });
  });

  describe('update', () => {
    it('should update an existing trip', async () => {
      const updatedTripData = {
        id: 1,
        user_id: 1,
        country_id: 1,
        duration: 10,
        fromDate: new Date(),
        toDate: new Date(),
        transportation_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
      
      const mockTrip = { id: 1, ...updatedTripData, save: jest.fn() };
      (Trip.findByPk as jest.Mock).mockResolvedValue(mockTrip);

      const result = await tripController.update(1, 1, 1, 10, new Date(), new Date(), 1, new Date(), new Date());
      
      expect(result).toEqual(mockTrip);
      expect(mockTrip.save).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a trip', async () => {
      const mockTrip = { id: 1, destroy: jest.fn() };
      (Trip.findByPk as jest.Mock).mockResolvedValue(mockTrip);

      await tripController.delete(1);

      expect(mockTrip.destroy).toHaveBeenCalled();
    });

    it('should return undefined if no trip is found to delete', async () => {
      (Trip.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await tripController.delete(999);

      expect(result).toBeUndefined();
    });
  });
});
