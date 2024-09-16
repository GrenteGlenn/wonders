import AuthController from '../controllers/AuthController';
import UserInterface from '../interfaces/UserInterface';
import User from '../../models/user';

jest.mock('../../models/user');

describe('Auth model', () => {

  let controller: AuthController;

  beforeEach(() => {
    controller = new AuthController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all user', async () => {

    const mockUser = [
      {
        id: 1,
        first_name: 'test',
        last_name: 'test',
        email: 'test@test.com',
        password: '...',
        created_at: new Date(),
        updated_at: new Date(),
        birth_date: new Date(),
        language_id: {}
      },
      {
        id: 2,
        first_name: 'test',
        last_name: 'test',
        email: 'test@test.com',
        password: '...',
        created_at: new Date(),
        updated_at: new Date(),
        birth_date: new Date(),
        language_id: {}
      }];

    (User.findAll as jest.Mock).mockResolvedValue(mockUser);

    const result = await controller.list();

    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUser);
  });

  it('should get one user by id', async () => {
    const mockUser = [
      {
        id: 1,
        first_name: 'test',
        last_name: 'test',
        email: 'test@test.com',
        password: '...',
        created_at: new Date(),
        updated_at: new Date(),
        birth_date: new Date(),
        language_id: {}
      }];

    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const result = await controller.getOne(1);

    expect(User.findByPk).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUser);
  });

  it('should get user by email', async () => {
    const mockUser = [
      {
        id: 1,
        first_name: 'test',
        last_name: 'test',
        email: 'test@test.com',
        password: '...',
        created_at: new Date(),
        updated_at: new Date(),
        birth_date: new Date(),
        language_id: {}
      }];

    const email = 'test@test.com';

    (User.findOne as jest.Mock).mockResolvedValue(mockUser);

    const result = await controller.getOneByEmail(email);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUser);
  });

  it('should create a new user', async () => {
    const mockUser = {
      id: 1,
      first_name: 'test',
      last_name: 'test',
      email: 'test@test.com',
      password: '...',
      iv: '...',
      auth_tag: '...',
      created_at: new Date(),
      updated_at: new Date(),
      birth_date: new Date(),
      language_id: {}
    };

    const userData = {
      first_name: 'test',
      last_name: 'test',
      email: 'test@test.com',
      password: '...',
      birth_date: new Date(),
      language_id: {}
    };

    (User.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await controller.create(userData as UserInterface);

    expect(User.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUser);
  });

  it('should update user', async () => {
    const mockUser = {
      id: 1,
      first_name: 'test',
      last_name: 'test',
      email: 'test@test.com',
      password: '...',
      created_at: new Date(),
      updated_at: new Date(),
      birth_date: new Date(),
      language_id: {
        id: 1,
        name: 'Un Truc'
      },
      save: jest.fn()
    };

    const userData: UserInterface = {
      id: 1,
      first_name: 'test2',
      last_name: 'test2',
      email: 'test@test.com2',
      password: '...',
      created_at: new Date(),
      updated_at: new Date(),
      birth_date: new Date(),
      language_id: {
        id: 1,
        name: 'Un Truc'
      },
    };

    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const result = await controller.update(1, userData);

    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(mockUser.save).toHaveBeenCalled();
    if (result != null) {
      expect(result.first_name).toBe('test2');
      expect(result.last_name).toBe('test2');
      expect(result.email).toBe('test@test.com2');
      expect(result.password).toBe('...');
    }

  });

  it('should delete user', async () => {
    const mockUser = {
      id: 1,
      first_name: 'test',
      last_name: 'test',
      email: 'test@test.com',
      password: '...',
      created_at: new Date(),
      updated_at: new Date(),
      birth_date: new Date(),
      language_id: {},
      destroy: jest.fn()
    };

    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const result = await controller.remove(1);

    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(mockUser.destroy).toHaveBeenCalled();
  });
});