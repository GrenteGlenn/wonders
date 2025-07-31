import CityController from '../controllers/CityController';
import City from '../../models/city';

jest.mock('../../models/city');

describe('CityController', () => {
  let controller: CityController;

  beforeEach(() => {
    controller = new CityController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const created_at = new Date();
  const updated_at = new Date();

  it('should list all cities', async () => {
    const mockCity = [
      {
        id: 1,
        name: 'Paris',
        country: 74,
        created_at: '2024-09-15T17:18:54.740Z',
        updated_at: '2024-09-15T17:18:54.740Z',
        ctry: {
          id: 74,
          name: 'France',
          code: 'FR',
          created_at: '2024-09-15T17:18:54.709Z',
          updated_at: '2024-09-15T17:18:54.709Z'
        }
      }
    ];
    (City.findAll as jest.Mock).mockResolvedValue(mockCity);

    const result = await controller.list();

    expect(City.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCity);
  });

  it('should get one city by id', async () => {
    const mockCity = [
      {
        id: 1,
        name: 'Paris',
        country: 74,
        created_at: '2024-09-15T17:18:54.740Z',
        updated_at: '2024-09-15T17:18:54.740Z',
        ctry: {
          id: 74,
          name: 'France',
          code: 'FR',
          created_at: '2024-09-15T17:18:54.709Z',
          updated_at: '2024-09-15T17:18:54.709Z'
        }
      }
    ];
    (City.findByPk as jest.Mock).mockResolvedValue(mockCity);

    const result = await controller.one(1);

    expect(City.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockCity);
  });

  it('should create a new city', async () => {
    const mockCity = { id: 1, name: 'Paris', country: 190, created_at: created_at, updated_at: updated_at };
    (City.create as jest.Mock).mockResolvedValue(mockCity);

    const result = await controller.new('Paris', 190, created_at, updated_at);

    expect(City.create).toHaveBeenCalledWith({ name: 'Paris', code: 190, created_at, updated_at });
    expect(result).toEqual(mockCity);
  });

  it('should update an existing city', async () => {
    const mockCity = {
      id: 1,
      name: 'Paris',
      country: 190,
      created_at: created_at,
      updated_at: updated_at,
      save: jest.fn()
    };
    (City.findByPk as jest.Mock).mockResolvedValue(mockCity);

    const result = await controller.update(1, 'Paris', 190, created_at, updated_at);

    expect(City.findByPk).toHaveBeenCalledWith(1);
    expect(mockCity.save).toHaveBeenCalled();
    expect(mockCity.name).toBe('Paris');
    expect(mockCity.country).toBe(190);
    expect(result).toEqual(mockCity);
  });

  it('should remove a city by id', async () => {
    const mockCity = { id: 1, name: 'Paris', country: 190, destroy: jest.fn() };
    (City.findByPk as jest.Mock).mockResolvedValue(mockCity);

    const result = await controller.remove(1);

    expect(City.findByPk).toHaveBeenCalledWith(1);
    expect(mockCity.destroy).toHaveBeenCalled();
    expect(result).toEqual(mockCity);
  });
});
