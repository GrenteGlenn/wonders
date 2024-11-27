import Organization from '../../models/organization';
import OrganizationController from '../controllers/OrganizationController';

// Mock du modèle Organization
jest.mock('../../models/organization');

describe('OrganizationController', () => {
  let controller: OrganizationController;

  beforeEach(() => {
    controller = new OrganizationController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  const created_at = new Date();
  const updated_at = new Date();

  it('should list all organizations', async () => {
    const mockOrganizations = [
      { id: 1, user_id: 1, status_id: 1 },
      { id: 2, user_id: 2, status_id: 2 }
    ];
    (Organization.findAll as jest.Mock).mockResolvedValue(mockOrganizations);

    const result = await controller.list();

    expect(Organization.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockOrganizations);
  });

  it('should get one organization by id', async () => {
    const mockOrganization = { id: 1, user_id: 1, status_id: 1 };
    (Organization.findByPk as jest.Mock).mockResolvedValue(mockOrganization);

    const result = await controller.one(1);

    expect(Organization.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockOrganization);
  });

  it('should create a new organization', async () => {
    const mockOrganization = { id: 1, user_id: 1, status_id: 1, created_at: created_at, updated_at: updated_at };
    (Organization.create as jest.Mock).mockResolvedValue(mockOrganization);

    const result = await controller.new(1, 1, created_at, updated_at);

    expect(Organization.create).toHaveBeenCalledWith({ user_id: 1, status_id: 1, created_at, updated_at });
    expect(result).toEqual(mockOrganization);
  });

  it('should update an existing organization', async () => {
    const mockOrganization = {
      id: 1,
      user_id: 1,
      status_id: 1,
      created_at: created_at,
      updated_at: updated_at,
      save: jest.fn().mockResolvedValue(true)
    };
    (Organization.findByPk as jest.Mock).mockResolvedValue(mockOrganization);

    const result = await controller.update(1, 2, 3);

    expect(Organization.findByPk).toHaveBeenCalledWith(1);
    expect(mockOrganization.save).toHaveBeenCalled();
    expect(mockOrganization.user_id).toBe(2);
    expect(mockOrganization.status_id).toBe(3);
    expect(result).toEqual(mockOrganization);
  });

  it('should delete an organization by id', async () => {
    const mockOrganization = {
      id: 1,
      user_id: 1,
      status_id: 1,
      destroy: jest.fn().mockResolvedValue(true)
    };
    (Organization.findByPk as jest.Mock).mockResolvedValue(mockOrganization);

    const result = await controller.delete(1);

    expect(Organization.findByPk).toHaveBeenCalledWith(1);
    expect(mockOrganization.destroy).toHaveBeenCalled();
    expect(result).toEqual(mockOrganization);
  });
});
