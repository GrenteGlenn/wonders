import AuthController from '../controllers/AuthController';
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
        iv: '...',
        auth_tag: '...',
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
        iv: '...',
        auth_tag: '...',
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
});