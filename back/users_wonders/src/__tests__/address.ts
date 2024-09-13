import AddressController from '../controllers/AddressController';
import Address from '../../models/address';
import assert from 'node:assert';
import AddressInterface from '../interfaces/AddressInterface';
import User from '../../models/user';

jest.mock('../../models/address');

describe('Address', () => {

  let controller: AddressController;

  beforeEach(() => {
    controller = new AddressController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all address', async () => {
    const mockAddress = [{
      id: 1,
      user_id: 1,
      country_id: 1,
      name: 'mock address',
      street: '123 Main St',
      city: 'New York',
      zip_code: '475 408',
      complementary: '123 Main St'
    }];

    (Address.findAll as jest.Mock).mockResolvedValue(mockAddress);

    const result = await controller.list();

    expect(Address.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockAddress);
  });

  it('should get address by id', async () => {
    const mockAddress = [{
      id: 1,
      user_id: 1,
      country_id: 1,
      name: 'mock address',
      street: '123 Main St',
      city: 'New York',
      zip_code: '475 408',
      complementary: '123 Main St'
    }];

    (Address.findByPk as jest.Mock).mockResolvedValue(mockAddress);

    const result = await controller.getOne(1);

    expect(Address.findByPk).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockAddress);
  });

  it('should get address by country_id', async () => {
    const mockAddress = [{
      id: 1,
      user_id: 1,
      country_id: 1,
      name: 'mock address',
      street: '123 Main St',
      city: 'New York',
      zip_code: '475 408',
      complementary: '123 Main St'
    }];

    (Address.findAll as jest.Mock).mockResolvedValue(mockAddress);

    const result = await controller.getByCountry(1);

    expect(Address.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockAddress);
  });

  it('should get address by user_id', async () => {
    const mockAddress = [{
      id: 1,
      user_id: 1,
      country_id: 1,
      name: 'mock address',
      street: '123 Main St',
      city: 'New York',
      zip_code: '475 408',
      complementary: '123 Main St'
    }];

    (Address.findAll as jest.Mock).mockResolvedValue(mockAddress);

    const result = await controller.getByUser(1);

    expect(Address.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockAddress);
  });

  it('should update address', async () => {
    const mockAddress = {
      id: 1,
      user_id: 1,
      country_id: 1,
      name: 'mock address',
      street: '123 Main St',
      city: 'New York',
      zip_code: '475 408',
      complementary: '123 Main St',
      created_at: new Date(),
      updated_at: new Date(),
      save: jest.fn()
    };

    const addressData: AddressInterface = {
      id: 1,
      user_id: {
        id: 1,
        first_name: 'test',
        last_name: 'test',
        email: 'test@gmail.com',
        password: '...',
        iv: '...',
        auth_tag: '...',
        created_at: new Date,
        updated_at: new Date,
        birth_date: new Date,
        language_id: {
          id: 1,
          name: 'Un Truc'
        },
        role_id: []
      },
      country_id: {
        id: 1,
        name: 'France',
        code: 'FR'
      },
      name: 'mock address2',
      street: '123 Main St2',
      city: 'New York2',
      zip_code: '475 4082',
      complementary: '123 Main St2',
      created_at: new Date(),
      updated_at: new Date()
    };

    (Address.findByPk as jest.Mock).mockResolvedValue(mockAddress);

    const result = await controller.update(1, addressData);

    expect(Address.findByPk).toHaveBeenCalledWith(1);
    expect(mockAddress.save).toHaveBeenCalled();
    if (result != null) {
      expect(result.name).toBe('mock address2');
      expect(result.street).toBe('123 Main St2');
      expect(result.city).toBe('New York2');
      expect(result.zip_code).toBe('475 4082');
      expect(result.complementary).toBe('123 Main St2');
    }
  });

  it('should delete address', async () => {
    const mockAddress = {
      id: 1,
      user_id: 1,
      country_id: 1,
      name: 'mock address',
      street: '123 Main St',
      city: 'New York',
      zip_code: '475 408',
      complementary: '123 Main St',
      destroy: jest.fn()
    };

    (Address.findByPk as jest.Mock).mockResolvedValue(mockAddress);

    const result = await controller.remove(1);

    expect(Address.findByPk).toHaveBeenCalledWith(1);
    expect(mockAddress.destroy).toHaveBeenCalled();
  });
});
