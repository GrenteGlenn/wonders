import Address from '../../models/address';
import AddressInterface from '../interfaces/AddressInterface';

export default class AddressController {
  async list() {
    return await Address.findAll();
  }

  async getOne(id: number) {
    return await Address.findByPk(id);
  }

  async getByUser(user_id: number) {
    return await Address.findAll({ where: { user_id: user_id } });
  }

  async getByCountry(country_id: number) {
    return await Address.findAll({ where: { country_id: country_id } });
  }

  async new(addresses: AddressInterface) {
    const date = new Date();
    addresses.created_at = date;
    addresses.updated_at = date;
    return await Address.create(addresses);
  }

  async update(id: number, address: AddressInterface) {
    const addresses = await Address.findByPk(id);
    if (addresses) {
      addresses.city = address.city;
      await addresses.save();
    }
  }

  async remove(id: number) {
    const address = await Address.findByPk(id);
    if (address) {
      await address.destroy();
    }
  }
}
