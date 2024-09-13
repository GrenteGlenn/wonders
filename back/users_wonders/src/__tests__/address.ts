import AddressController from '../controllers/AddressController';
import Address from '../../models/address';
import assert from 'node:assert';
import AddressInterface from '../interfaces/AddressInterface';

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
      complementary: '123 Main St'
    };

    const newAddress = [{
      id: 1,
      user_id: 1,
      country_id: 2,
      name: 'mock address2',
      street: '123 Main St2',
      city: 'New York2',
      zip_code: '475 4082',
      complementary: '123 Main St2'
    }];

    (Address.update as jest.Mock).mockResolvedValue(mockAddress);

    const result = await controller.update(mockAddress.id, newAddress as unknown as AddressInterface);

    expect(result).toEqual(newAddress);
  });

  it('should delete address', async () => {
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

    (Address.destroy as jest.Mock).mockResolvedValue(mockAddress);

    const result = await controller.remove(1);

    expect(result).toEqual('Address destroyed');
  });
});
