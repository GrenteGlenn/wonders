import Role from '../../models/role';
import RoleInterface from '../interfaces/RoleInterface';

export default class RoleController {

  async list() {
    return await Role.findAll();
  }

  async getOne(id: number) {
    return await Role.findByPk(id);
  }

  async create(roleData: RoleInterface) {
    return await Role.create(roleData);
  }

  async update(id: number, roleData: RoleInterface) {
    const role = await Role.findByPk(id);
    if (role) {
      role.role = roleData.role;
      await role.save();
    }
    return role;
  }

  async delete(id: number) {
    const role = await Role.findByPk(id);
    if (role) {
      await role.destroy();
    }
    return 'Role destroyed';
  }

}