import ActivityController from '../controllers/activityController';
import Activity from '../../models/activity';

jest.mock('../../models/activity');

describe('ActivityController', () => {
  let controller: ActivityController;

  beforeEach(() => {
    controller = new ActivityController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should list all activities', async () => {
    const mockActivities = [{ id: 1, name: 'plongée soumarine à saint-florent', url:'https://test.com', description: 'bla ... bla ... bla..', is_free: true, duration: 45, price: 105, partner: 'tripadvisor', category_id: 2 },{ id: 2, name: 'Musee national de la santé', url:'https://test.com', description: 'bla ... bla ... bla..', is_free: false, duration: 45, price: 15, partner: 'tripadvisor', category_id: 3 }];
    (Activity.findAll as jest.Mock).mockResolvedValue(mockActivities);

    const result = await controller.list();

    expect(Activity.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockActivities);
  });

  it('should get one activity by id', async () => {
    const mockActivities = { id: 1, name: 'plongée soumarine à saint-florent', url:'https://test.com', description: 'bla ... bla ... bla..', is_free: true, duration: 45, price: 105, partner: 'tripadvisor', category_id: 2 };
    (Activity.findByPk as jest.Mock).mockResolvedValue(mockActivities);

    const result = await controller.one(1);

    expect(Activity.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockActivities);
  });

  it('should create a new activity', async () => {
    const mockActivity = { id: 1, name: 'plongée soumarine à saint-florent', url:'https://test.com', description: 'bla ... bla ... bla..', is_free: true, duration: 45, price: 105, partner: 'tripadvisor', category_id: 2 };
    (Activity.create as jest.Mock).mockResolvedValue(mockActivity);
    const data = { name: 'plongée soumarine à saint-florent', url:'https://test.com', description: 'bla ... bla ... bla..', is_free: true, duration: 45, price: 105, partner: 'tripadvisor', category_id: 2};
    const result = await controller.new(data as any);

    expect(Activity.create).toHaveBeenCalledWith(data);
    expect(result).toEqual(mockActivity);
  });

  it('should update an existing activity', async () => {
    const mockActivity = { id: 1, name: 'plongée soumarine à saint-florent', url:'https://test.com', description: 'bla ... bla ... bla..', is_free: true, duration: 45, price: 105, partner: 'tripadvisor', category_id: 2, save: jest.fn() };
    (Activity.findByPk as jest.Mock).mockResolvedValue(mockActivity);

    const result = await controller.update(1,'rrrrr', 'https://test.com', 'bla ... bla ... bla..' as any, true, 45, 106, 'tripadvisor', 2  );

    expect(Activity.findByPk).toHaveBeenCalledWith(1);
    expect(mockActivity.save).toHaveBeenCalled();
    expect(mockActivity.url).toBe('https://test.com');
    expect(result).toEqual(mockActivity);
  });

  it('should remove a activity by id', async () => {
    const mockActivity = { id: 1, name: 'plongée soumarine à saint-florent', url:'https://test.com', description: 'bla ... bla ... bla..', is_free: true, duration: 45, price: 105, partner: 'tripadvisor', category_id: 2, destroy: jest.fn() };
    (Activity.findByPk as jest.Mock).mockResolvedValue(mockActivity);

    const result = await controller.delete(1);

    expect(Activity.findByPk).toHaveBeenCalledWith(1);
    expect(mockActivity.destroy).toHaveBeenCalled();
    expect(result).toEqual('resource had been deleted');
  });
});
