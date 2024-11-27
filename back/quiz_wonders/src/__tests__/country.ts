import CountryController from '../controllers/CountryController';
import Country from '../../models/country';

jest.mock('../../models/country');

describe('CountryController', () => {
  let controller: CountryController;

  beforeEach(() => {
    controller = new CountryController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const created_at = new Date();
  const updated_at = new Date();

  it('should list all countries', async () => {
    const mockCountries = [{ id: 1, name: 'France', code: 'FR' }];
    (Country.findAll as jest.Mock).mockResolvedValue(mockCountries);

    const result = await controller.list();

    expect(Country.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCountries);
  });

  it('should get one country by id', async () => {
    const mockCountry = { id: 1, name: 'France', code: 'FR' };
    (Country.findByPk as jest.Mock).mockResolvedValue(mockCountry);

    const result = await controller.one(1);

    expect(Country.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockCountry);
  });

  it('should create a new country', async () => {
    const mockCountry = { id: 1, name: 'France', code: 'FR', created_at: created_at, updated_at: updated_at };
    (Country.create as jest.Mock).mockResolvedValue(mockCountry);

    const result = await controller.new('France', 'FR', created_at, updated_at);

    expect(Country.create).toHaveBeenCalledWith({ name: 'France', code: 'FR', created_at, updated_at });
    expect(result).toEqual(mockCountry);
  });

  it('should update an existing country', async () => {
    const mockCountry = {
      id: 1,
      name: 'France',
      code: 'FR',
      created_at: created_at,
      updated_at: updated_at,
      save: jest.fn()
    };
    (Country.findByPk as jest.Mock).mockResolvedValue(mockCountry);

    const result = await controller.update(1, 'Germany', 'DE');

    expect(Country.findByPk).toHaveBeenCalledWith(1);
    expect(mockCountry.save).toHaveBeenCalled();
    expect(mockCountry.name).toBe('Germany');
    expect(mockCountry.code).toBe('DE');
    expect(result).toEqual(mockCountry);
  });

  it('should remove a country by id', async () => {
    const mockCountry = { id: 1, name: 'France', code: 'FR', destroy: jest.fn() };
    (Country.findByPk as jest.Mock).mockResolvedValue(mockCountry);

    const result = await controller.remove(1);

    expect(Country.findByPk).toHaveBeenCalledWith(1);
    expect(mockCountry.destroy).toHaveBeenCalled();
    expect(result).toEqual(mockCountry);
  });
});
